# Generated by Django 5.1.2 on 2024-11-11 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('victim', 'Victim'), ('responder', 'Responder'), ('admin', 'Admin'), ('transport', 'Transport'), ('ngo', 'Ngo')], default='victim', max_length=20),
        ),
    ]
