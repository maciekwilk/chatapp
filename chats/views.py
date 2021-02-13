from django.http import HttpResponse

from .models import Message
from .serializers import MessageSerializer
from rest_framework import generics


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
