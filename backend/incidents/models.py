from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.

class Incident(models.Model):
    STATUS_CHOICES = [
        ('reported','New'),
        ('in_progress','In Progress'),
        ('resolved','Resolved')
    ]
    title = models.CharField(max_length=50)
    description = models.TextField()
    location = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS_CHOICES,default='reported',max_length=20)
    reporter = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="reported_incidents")
    assigned_responder = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_incidents")

    def __str__(self):
        return f"{self.title} - {self.status}"

class IncidentUpdate(models.Model):
    incident = models.ForeignKey(Incident, on_delete=models.CASCADE, related_name="updates")
    timestamp = models.DateTimeField(auto_now_add=True)
    update_text = models.TextField()
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Update for Incident: {self.incident.title} at {self.timestamp}"
