from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Incident
from .serializers import IncidentSerializer,LocationSerializer

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def perform_create(self, serializer):
        # Automatically set latitude and longitude from the request data
        serializer.save()

class LocationListView(viewsets.ModelViewSet):
    queryset = Incident.objects.values('latitude', 'longitude')
    serializer_class = LocationSerializer

