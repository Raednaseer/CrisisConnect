# Generated by Django 5.1.2 on 2024-11-07 04:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0011_incident_type'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='incident',
            name='assigned_responder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='incidents_assigned', to=settings.AUTH_USER_MODEL),
        ),
    ]
