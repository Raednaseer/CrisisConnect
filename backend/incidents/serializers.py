# incidents/serializers.py
from rest_framework import serializers
from .models import Incident

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'  

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['latitude', 'longitude'] 