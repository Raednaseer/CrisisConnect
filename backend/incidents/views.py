""" # incident/views.py
from rest_framework import viewsets
from .serializers import IncidentSerializer, IncidentUpdateSerializer

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Incident
from .serializers import IncidentSerializer
from users.permissions import IsResponder, IsAdmin, IsVictim

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAdmin]
        elif self.action in ['update', 'partial_update']:
            permission_classes = [IsResponder]
        else:
            permission_classes = [IsVictim]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        # Only a victim can create an incident
        serializer.save(reporter=self.request.user) """


""" class IncidentUpdateViewSet(viewsets.ModelViewSet):
    queryset = IncidentUpdate.objects.all()
    serializer_class = IncidentUpdateSerializer
    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user) """


from rest_framework import viewsets
from .models import Incident
from .serializers import IncidentSerializer

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def perform_create(self, serializer):
        # Automatically set latitude and longitude from the request data
        serializer.save()
