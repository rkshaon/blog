from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from blog_api.models import Blog

from blog_api.serializers import BlogSerializer



class BlogView(APIView):
    def get(self, request, *args, **kwargs):
        return Response()
    

    def post(self, request, *args, **kwargs):
        return Response()