import json
from datetime import datetime

from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        message = json.loads(text_data)

        self.send(text_data=json.dumps({
            'username': message['username'],
            'text': message['text'],
            'timestamp': str(datetime.now())
        }))
