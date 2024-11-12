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

class IncidentListSerializer(serializers.ModelSerializer):
    assigned_responder = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Incident
        fields = ['id', 'title', 'description', 'latitude', 'longitude', 'timestamp' ,'status', 'assigned_responder', 'type','username','phone_no']

class AssignIncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['status', 'assigned_responder']
        read_only_fields = ['status']

    def update(self, instance, validated_data):
        responder = validated_data.get('assigned_responder')
        instance.assign_to_responder(responder)
        return instance

class ResolveIncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['status']
        read_only_fields = ['status']

    def update(self, instance, validated_data):
        instance.resolve()
        return instance