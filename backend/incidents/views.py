from rest_framework.views import APIView
from rest_framework import viewsets, generics
from rest_framework.response import Response
from .models import Incident
from .serializers import IncidentSerializer,LocationSerializer
from rest_framework.permissions import IsAuthenticated
""" from django.core import mail
from django.conf import settings """

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def perform_create(self, serializer):
        # Automatically set latitude and longitude from the request data
        serializer.save()
        """ self.send_confirmation_email(incident)

    def send_confirmation_email(self, incident):
        subject = f"Incident Report Confirmation: {incident.title}"
        message = f"
        Hello,

        Your incident report has been successfully submitted.

        Details:
        - Title: {incident.title}
        - Type: {incident.type}
        - Status: {incident.status}
        - Timestamp: {incident.timestamp.strftime('%Y-%m-%d %H:%M:%S')}
        - Location: Latitude: {incident.latitude}, Longitude: {incident.longitude}

        Thank you for reporting the incident.

        Best regards,
        CrisisConnect Team
        "
        from_email = settings.EMAIL_HOST_USER
        recipient_email = incident.username  # Use reported_by or username (email)
        
        mail.send_mail(subject, message, from_email, [recipient_email]) """
 


class UserReportsView(generics.ListAPIView):
    serializer_class = IncidentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Incident.objects.filter(reported_by=user.id)

