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