from rest_framework import serializers

from blog_api.models import Blog

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


