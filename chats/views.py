import redis
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

from chats import message_store

redis_instance = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)


@api_view(['GET'])
def messages(request, chat, *args, **kwargs):
    items = message_store.get_messages(chat)
    return Response(items, 200)

