from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

from blog_api.models import Blog
from blog_api.models import BlogComment

from blog_api.serializers import BlogSerializer
from blog_api.serializers import BlogCommentSerializer



class BlogView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        blog_status = request.GET.get('status')
        pk = kwargs.get('pk', None)

        if pk:
            try:
                blog = Blog.objects.get(pk=pk, is_approved=True, is_deleted=False)
                data = self.serializer_class(blog).data
                
                data['comments'] = BlogCommentSerializer(
                    BlogComment.objects.filter(blog=blog, is_deleted=False), 
                    many=True
                    ).data
                
                return Response(data)
            
            except Blog.DoesNotExist:
                return Response({
                    'error': 'Blog does not exist.'
                }, status=status.HTTP_404_NOT_FOUND)
            
        if blog_status:
            if blog_status.lower() == 'approved':
                blogs = Blog.objects.filter(author=user, is_approved=True, is_deleted=False)
            elif blog_status.lower() == 'pending':
                blogs = Blog.objects.filter(author=user, is_approved=False, is_deleted=False)
        else:
            blogs = Blog.objects.filter(author=user, is_approved=True, is_deleted=False)
        
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
    

    def delete(self, request, *args, **kwargs):
        user = request.user
        pk = kwargs.get('pk', None)

        try:
            blog = Blog.objects.get(pk=pk, author=user, is_deleted=False)
            blog.is_deleted = True
            blog.save()

        except Blog.DoesNotExist:
            return Response({
                'error': 'Blog does not exist.'
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "message": "Blog deleted successfully.",
        })


class BlogArchiveView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        pk = kwargs.get('pk', None)
        
        try:
            blog = Blog.objects.exclude(blog_status='archive').get(pk=pk, author=user, is_deleted=False)
            blog.blog_status = 'archive'
            blog.save()
            
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
            blog = Blog.objects.get(pk=pk, blog_status='archive', author=user, is_deleted=False)
            blog.blog_status = 'draft'
            blog.save()

        except Blog.DoesNotExist:
            return Response({
                'error': 'Blog does not exist.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            'message': 'Blog unarchived successfully.',
        })


class BlogCommentView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BlogCommentSerializer

    def post(self, request, *args, **kwargs):
        temp_data = request.data.copy()
        temp_data['commentor'] = request.user.id

        serializer = self.serializer_class(data=temp_data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)
        
        return Response(serializer.data)