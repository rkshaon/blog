from django.urls import path

from user_api import views



urlpatterns = [
    path('register/', views.UserRegistrationView.as_view()),
]