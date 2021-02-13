from django.db import models


class Message(models.Model):
    username = models.CharField(max_length=100)
    text = models.CharField(max_length=300)
    timestamp = models.DateTimeField(auto_now_add=True)

