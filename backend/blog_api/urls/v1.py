from django.urls import path

from blog_api import views



urlpatterns = [
    path('', views.BlogView.as_view()),
    path('<int:pk>', views.BlogView.as_view()),
    path('archive/<int:pk>', views.BlogArchiveView.as_view()),
    path('unarchive/<int:pk>', views.BlogUnarchiveView.as_view()),
    # path('comment', views.BlogCommentView.as_view()),
]