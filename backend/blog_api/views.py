from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

from blog_api.models import Blog

from blog_api.serializers import BlogSerializer



class BlogView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        status = request.GET.get('status')

        if status:
            if status.lower() == 'approved':
                blogs = Blog.objects.filter(author=user, is_approved=True)
            elif status.lower() == 'pending':
                blogs = Blog.objects.filter(author=user, is_approved=False)
        else:
            blogs = Blog.objects.filter(author=user, is_approved=True)
        
        return Response(self.serializer_class(blogs, many=True).data)
    

    def post(self, request, *args, **kwargs):
        temp_data = request.data.copy()
        temp_data['author'] = request.user.id
        
        serializer = self.serializer_class(data=temp_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class BlogArchiveView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def post(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        
        try:
            blog = Blog.objects.exclude(blog_status='archive').get(pk=pk)
            
        except Blog.DoesNotExist:
            return Response({
                'error': 'Blog does not exist.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "message": "Blog archived successfully.",
        })


class BlogUnarchiveView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        pk = kwargs.get('pk', None)

        try:
            blog = Blog.objects.get(pk=pk, blog_status='archive', author=user)
            blog.blog_status = 'draft'
            blog.save()

        except Blog.DoesNotExist:
            return Response({
                'error': 'Blog does not exist.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            'message': 'Blog unarchived successfully.',
        })