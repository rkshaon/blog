from django.urls import path

from rating_api import views



urlpatterns = [
    path('', views.RatingView.as_view()),
]