# Generated by Django 5.1.2 on 2024-11-06 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0010_incident_username_alter_incident_reported_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='incident',
            name='type',
            field=models.CharField(choices=[('natural_disaster', 'Natural Disaster'), ('medical_emergency', 'Medical Emergency'), ('accidents', 'Accidents')], default='natural_disaster', max_length=20),
        ),
    ]
