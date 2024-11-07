from rest_framework.views import APIView
from rest_framework import viewsets, generics,status
from rest_framework.response import Response
from .models import Incident
from .serializers import (IncidentSerializer,IncidentListSerializer,AssignIncidentSerializer,ResolveIncidentSerializer)
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAdmin,IsVictim,IsResponder
""" from django.core import mail
from django.conf import settings """
from rest_framework.decorators import action


class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return IncidentSerializer
        elif self.action == 'assign':
            return AssignIncidentSerializer
        elif self.action == 'resolve':
            return ResolveIncidentSerializer
        return IncidentListSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsResponder])
    def reported_incidents(self, request):
        # Custom logic to filter incidents by status 'reported'
        queryset = self.get_queryset().filter(status='reported')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def assign(self, request, pk=None):
        incident = self.get_object()
        if incident.status != 'reported':
            return Response({"error": "Incident is not available for assignment."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(incident, data={"assigned_responder": request.user.id}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Incident assigned to responder."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def resolve(self, request, pk=None):
        incident = self.get_object()
        if incident.status != 'in_progress' or incident.assigned_responder != request.user:
            return Response({"error": "Only the assigned responder can resolve this incident."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(incident, data={}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Incident resolved."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserReportsView(generics.ListAPIView):
    serializer_class = IncidentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Incident.objects.filter(reported_by=user.id)

class ResponderAssignedView(generics.ListAPIView):
    serializer_class = IncidentSerializer
    permission_classes = [IsResponder]

    def get_queryset(self):
        user = self.request.user
        return Incident.objects.filter(assigned_responder=user.id)

