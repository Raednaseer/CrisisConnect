from django.shortcuts import render
from rest_framework import viewsets
from .models import Transportation,Shelters,NGO
from .serializers import TransportationSerializer,SheltersSerializer,NGOSerializer
from rest_framework.permissions import AllowAny
from users.permissions import IsAdmin,IsResponder,IsVictim

# Create your views here.
class TransportationViewSet(viewsets.ModelViewSet):
    queryset=Transportation.objects.all()
    serializer_class=TransportationSerializer


class SheltersViewSet(viewsets.ModelViewSet):
    queryset=Shelters.objects.all()
    serializer_class=SheltersSerializer

class NGOViewSet(viewsets.ModelViewSet):
    queryset=NGO.objects.all()
    serializer_class=NGOSerializer