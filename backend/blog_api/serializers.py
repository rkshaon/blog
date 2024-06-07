from django.db.models import Avg

from rest_framework import serializers

from blog_api.models import Blog
from rating_api.models import Rating

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
            
        representation['rating'] = avg_rating = Rating.objects.filter(
            is_deleted=False,
            blog=instance).aggregate(Avg('rating')).get('rating__avg', None)
        
        if representation['rating'] is not None:
            representation['rating'] = round(representation['rating'], 2)
        
        return representation


