from rest_framework import serializers

from rating_api.models import Rating



class RatingSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('context', {}).get('request')
        super().__init__(*args, **kwargs)


    def validate(self, data):
        blog = data.get('blog')

        if blog:
            if blog.is_deleted is True:
                raise serializers.ValidationError('The blog is deleted.')
            
            if blog.blog_status != 'published':
                raise serializers.ValidationError('The blog is not published yet.')

            if not blog.is_approved:
                raise serializers.ValidationError('The blog is not approved yet.')
            
        user = self.request.user

        if Rating.objects.filter(blog=blog, rater=user).exists():
            raise serializers.ValidationError(
                "You have already rated this blog.")
        
        return data


    class Meta:
        fields = '__all__'
        model = Rating