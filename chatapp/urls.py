"""
chatapp URL Configuration
"""
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('chatapp/admin/', admin.site.urls),
    path('chatapp/chats/', include('chats.urls')),
    path('chatapp/', include('frontend.urls')),
]
