from django.contrib import admin

from comment_api.models import Comment



@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'blog', 'commentor', 'comment', 'is_deleted')
    list_filter = ('commentor',)
    search_fields = ('comment', )
    readonly_fields = ('id', )
