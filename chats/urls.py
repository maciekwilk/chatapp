from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('messages/', views.MessageListCreate.as_view()),
]