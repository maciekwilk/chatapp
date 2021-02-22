from django.shortcuts import render


def index(request, **kwargs):
    chat = ''
    if 'chat' in kwargs:
        chat = kwargs['chat']
    print(chat)
    return render(request, 'frontend/index.html', {'chat': chat})
