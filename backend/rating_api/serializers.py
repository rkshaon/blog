from rest_framework import serializers

from rating_api.models import Rating



class RatingSerializer(serializers.ModelSerializer):
    def validate(self, data):
        blog = data.get('blog')

        if blog:
            if blog.is_deleted is True:
                raise serializers.ValidationError('The blog is deleted.')
            
            if blog.blog_status != 'published':
                raise serializers.ValidationError('The blog is not published yet.')

            if not blog.is_approved:
                raise serializers.ValidationError('The blog is not approved yet.')
        
        user = self.context['request'].user

        if Rating.objects.filter(blog=blog, user=user).exists():
            raise serializers.ValidationError(
                "You have already rated this blog.")
        
        return data


    class Meta:
        fields = '__all__'
        model = Rating