# Generated by Django 5.1.2 on 2024-11-05 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_phone_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_no',
            field=models.CharField(max_length=20),
        ),
    ]
