# Generated by Django 5.1.2 on 2024-11-04 09:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0002_remove_incident_location_incident_latitude_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incident',
            name='assigned_responder',
        ),
        migrations.RemoveField(
            model_name='incident',
            name='reporter',
        ),
    ]