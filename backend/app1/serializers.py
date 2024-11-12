from app1.models import *
from rest_framework import serializers

class TransportationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Transportation
        fields='__all__'

class SheltersSerializer(serializers.ModelSerializer):
    class Meta:
        model=Shelters
        fields='__all__'

class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model=NGO
        fields='__all__'


class TransportRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportRequest
        fields = ['id', 'username', 'phone_no', 'vehicle', 'latitude', 'longitude', 'distance', 'timestamp', 'request_status']

class UserTransportRequestSerializer(serializers.ModelSerializer):
    vehicle = serializers.CharField(source='vehicle.license_plate')  # Just show vehicle license plate
    request_status = serializers.CharField()
    distance = serializers.FloatField()
    timestamp = serializers.DateTimeField()
    
    class Meta:
        model = TransportRequest
        fields = ['vehicle', 'request_status', 'distance', 'timestamp']
