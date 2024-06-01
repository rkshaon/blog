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



    

