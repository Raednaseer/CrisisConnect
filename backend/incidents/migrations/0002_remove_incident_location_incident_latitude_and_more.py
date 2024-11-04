# Generated by Django 5.1.2 on 2024-11-04 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incident',
            name='location',
        ),
        migrations.AddField(
            model_name='incident',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='incident',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='title',
            field=models.CharField(max_length=100),
        ),
        migrations.DeleteModel(
            name='IncidentUpdate',
        ),
    ]