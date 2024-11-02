# incident/views.py
from rest_framework import viewsets, status
#from rest_framework.response import Response
#from rest_framework.permissions import IsAuthenticated
from .models import Incident, IncidentUpdate
from .serializers import IncidentSerializer, IncidentUpdateSerializer

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)

class IncidentUpdateViewSet(viewsets.ModelViewSet):
    queryset = IncidentUpdate.objects.all()
    serializer_class = IncidentUpdateSerializer
    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)
