# Generated by Django 3.1.6 on 2021-02-13 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('text', models.CharField(max_length=300)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
