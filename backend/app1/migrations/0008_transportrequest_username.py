# Generated by Django 5.1.2 on 2024-11-11 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0007_remove_transportrequest_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='transportrequest',
            name='username',
            field=models.CharField(default='null', max_length=20),
        ),
    ]