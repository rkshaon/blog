from rest_framework import serializers

from blog_api.models import Blog



class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Blog