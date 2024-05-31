from django.contrib import admin

from blog_api.models import Blog
from blog_api.models import BlogComment



@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'title', 'content',
                    'blog_status', 'is_approved', 'approved_by',)
    list_filter = ('is_approved', 'blog_status',)
    search_fields = ('title', 'content')
    readonly_fields = ('id',)


@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'commentor', 'comment')
    list_filter = ('commentor',)
    search_fields = ('comment', )
    readonly_fields = ('id', )
