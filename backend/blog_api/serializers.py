from rest_framework import serializers

from blog_api.models import Blog

from user_api.serializers import UserSerializer



class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    approved_by = UserSerializer()
    
    class Meta:
        fields = '__all__'
        model = Blog