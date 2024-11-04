from django.db import models


class Incident(models.Model):
    STATUS_CHOICES = [
        ('reported','New'),
        ('in_progress','In Progress'),
        ('resolved','Resolved')
    ]
    title = models.CharField(max_length=100)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    #status = models.CharField(choices=STATUS_CHOICES,default='reported',max_length=20)

    def __str__(self):
        return f"{self.title} - {self.status}"

