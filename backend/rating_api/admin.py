from django.contrib import admin

from rating_api.models import Rating


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'blog', 'rater', 'rating', 'is_deleted')
    list_filter = ('rater',)
    search_fields = ('rating', )
    readonly_fields = ('id', )
