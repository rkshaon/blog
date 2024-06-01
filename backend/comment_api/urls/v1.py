from django.urls import path

from comment_api import views



urlpatterns = [
    path('', views.CommentView.as_view()),
]