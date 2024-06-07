from django.db import models



class Comment(models.Model):
    blog = models.ForeignKey('blog_api.Blog',
        on_delete=models.CASCADE,
        related_name='blog_comment',
    )
    commentor = models.ForeignKey('user_api.User',
        on_delete=models.CASCADE,
        related_name='commentor'
    )
    comment = models.CharField(max_length=255, blank=False, null=False)
    is_deleted = models.BooleanField(default=False)
    added_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs) -> None:
        if self.blog.blog_status == 'published' and self.blog.is_approved is True:
            super().save(*args, **kwargs)
        else:
            raise ValueError('The blog is not published or approved yet.')

    
    def __str__(self) -> str:
        return f"{self.blog.title} - {self.blog.author.username}: {self.commentor.username}: {self.comment}"
