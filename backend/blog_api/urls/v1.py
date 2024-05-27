from django.urls import path

from blog_api import views



urlpatterns = [
    path('', views.BlogView.as_view()),
]