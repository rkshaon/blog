from django.contrib import admin

from blog_api.models import Blog



@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'title', 'content',
                    'blog_status', 'is_approved', 'approved_by',)
    list_filter = ('is_approved', 'blog_status',)
    search_fields = ('author', 'title', 'content')
    readonly_fields = ('id',)
