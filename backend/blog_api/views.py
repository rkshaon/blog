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
        blogs = Blog.objects.filter(author=user, is_approved=True)
        
        return Response(self.serializer_class(blogs, many=True).data)
    

    def post(self, request, *args, **kwargs):
        return Response()