from rest_framework import serializers
from .models import Incident, IncidentUpdate

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['id', 'title', 'description', 'location', 'timestamp', 'status', 'reporter', 'assigned_responder']

class IncidentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentUpdate
        fields = ['id', 'incident', 'timestamp', 'update_text', 'updated_by']
