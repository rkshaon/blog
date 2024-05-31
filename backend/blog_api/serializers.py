from rest_framework import serializers

from blog_api.models import Blog
from blog_api.models import BlogComment

from user_api.serializers import UserSerializer



class BlogSerializer(serializers.ModelSerializer):    
    class Meta:
        fields = '__all__'
        model = Blog
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['author'] = UserSerializer(instance.author).data

        if instance.approved_by:
            representation['approved_by'] = UserSerializer(instance.approved_by).data
        
        return representation


class BlogCommentSerializer(serializers.ModelSerializer):
    def validate(self, data):
        blog = data.get('blog')

        if blog:
            if blog.is_deleted is True:
                raise serializers.ValidationError("The blog is deleted.")
            
            if blog.blog_status != 'published':
                raise serializers.ValidationError("The blog is not published yet.")
            
            if not blog.is_approved:
                raise serializers.ValidationError(
                    "The blog is not approved yet.")
            
        return data
    

    class Meta:
        fields = '__all__'
        model = BlogComment