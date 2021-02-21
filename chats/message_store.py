import json

import redis
from django.conf import settings

redis_instance = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)


def get_messages(chat):
    messages = redis_instance.lrange(_get_key(chat), 0, -1)
    if not messages:
        return []

    return [json.loads(message) for message in messages]


def add_message(key, message):
    redis_instance.rpush(key, message)


def _get_key(chat):
    return 'chat_{}'.format(chat)
