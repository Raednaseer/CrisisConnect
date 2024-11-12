# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('victim', 'Victim'),
        ('responder', 'Responder'),
        ('admin', 'Admin'),
        ('transport','Transport'),
        ('ngo', 'Ngo')
    ]
    phone_no = models.CharField(max_length=20)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='victim')
    def __str__(self):
        return f"{self.username} ({self.role})"
