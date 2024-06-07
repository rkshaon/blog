from rest_framework import serializers

from comment_api.models import Comment

from user_api.serializers import UserSerializer



class CommentSerializer(serializers.ModelSerializer):
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
        model = Comment

    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.commentor:
            representation['commentor'] = UserSerializer(
                instance.commentor).data
        
        return representation
