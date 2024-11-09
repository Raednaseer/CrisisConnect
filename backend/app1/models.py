from django.db import models

# Create your models here.
class Transportation(models.Model):
    vehicle_id=models.AutoField(primary_key=True)
    license_plate=models.CharField(max_length=15)
    vehicle_type=models.CharField(max_length=20,choices=[
        ('bus', 'Bus'),
        ('truck', 'Truck'),
        ('van', 'Van'),
        ('car', 'Car'),
        ('ambulance','Ambulance')
    ],default='ambulance')
    current_status=models.CharField(max_length=20,choices=[
        ('available', 'Available'),
        ('in_use', 'In Use'),
        ('maintenance', 'Under Maintenance'),
    ],default='available')
    location = models.CharField(max_length=100,default='Trivandrum')
    contact_info = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.license_plate}"

class Shelters(models.Model):
    camp_id=models.AutoField(primary_key=True)
    camp_address=models.TextField()
    location=models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()
    contact=models.CharField(max_length=100)
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
    ]
    
    status = models.CharField(max_length=6, choices=STATUS_CHOICES, default='open')

class NGO(models.Model):
    name=models.CharField(max_length=100)
    address=models.TextField()
    email=models.EmailField()
    phone=models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name}"