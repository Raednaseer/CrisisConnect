from django.db import models
from users.models import User
from django.core.exceptions import ValidationError


class Incident(models.Model):
    STATUS_CHOICES = [
        ('reported','New'),
        ('in_progress','In Progress'),
        ('resolved','Resolved')
    ]
    INCIDENT_TYPES = [
        ('natural_disaster','Natural Disaster'),
        ('medical_emergency','Medical Emergency'),
        ('accidents','Accidents')
    ]
    title = models.CharField(max_length=100)
    description = models.TextField()
    phone_no = models.CharField(max_length=15)
    timestamp = models.DateTimeField(auto_now_add=True)
    latitude = models.CharField(max_length=50,null=True)
    longitude = models.CharField(max_length=50,null=True)
    status = models.CharField(choices=STATUS_CHOICES,default='reported',max_length=20)
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='incidents',null=True,blank=True)
    type = models.CharField(choices=INCIDENT_TYPES,default='natural_disaster',max_length=20)
    username = models.CharField(max_length=100, null=True, blank=True)
    assigned_responder = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='incidents_assigned', null=True, blank=True)

    def clean(self):
        if self.assigned_responder and self.status == 'in_progress':
            assigned_incident = Incident.objects.filter(
                assigned_responder=self.assigned_responder, 
                status='in_progress'
            ).exclude(id=self.id).first()
            if assigned_incident:
                raise ValidationError("Responder is already assigned to another incident in progress.")

    def assign_to_responder(self, responder):
        self.assigned_responder = responder
        self.status = 'in_progress'
        self.save()

    def resolve(self):
        self.status = 'resolved'
        self.save()

    def __str__(self):
        return f"{self.title} ({self.status})"