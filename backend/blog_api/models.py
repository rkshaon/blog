from typing import Iterable
from django.db import models



class Blog(models.Model):
    BLOG_STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archive', 'Archive'),
    )

    author = models.ForeignKey(
        'user_api.User', 
        on_delete=models.CASCADE, 
        related_name='author')
    title = models.CharField(max_length=255)
    content = models.TextField()
    
    blog_status = models.CharField(max_length=20,choices=BLOG_STATUS_CHOICES, default='draft')
    is_approved = models.BooleanField(default=False)
    approved_by = models.ForeignKey(
        'user_api.User', 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True, 
        related_name='approver')

    is_deleted = models.BooleanField(default=False)
    added_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}: {self.author.username}"


class BlogComment(models.Model):
    blog = models.ForeignKey('blog_api.Blog',
        on_delete=models.CASCADE,
        related_name='blog')
    commentor = models.ForeignKey('user_api.User', 
        on_delete=models.CASCADE,
        related_name='commentor')
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
    

