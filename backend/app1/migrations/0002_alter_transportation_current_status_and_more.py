# Generated by Django 5.1.2 on 2024-11-09 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transportation',
            name='current_status',
            field=models.CharField(choices=[('available', 'Available'), ('in_use', 'In Use'), ('maintenance', 'Under Maintenance')], default='available', max_length=20),
        ),
        migrations.AlterField(
            model_name='transportation',
            name='location',
            field=models.CharField(default='Trivandrum', max_length=100),
        ),
        migrations.AlterField(
            model_name='transportation',
            name='vehicle_type',
            field=models.CharField(choices=[('bus', 'Bus'), ('truck', 'Truck'), ('van', 'Van'), ('car', 'Car'), ('ambulance', 'Ambulance')], default='ambulance', max_length=20),
        ),
    ]
