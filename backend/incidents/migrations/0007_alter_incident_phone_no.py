# Generated by Django 5.1.2 on 2024-11-05 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0006_incident_phone_no_incident_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incident',
            name='phone_no',
            field=models.CharField(max_length=15),
        ),
    ]
