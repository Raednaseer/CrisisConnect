# Create your views here.
from rest_framework import generics
from .serializers import RegisterSerializer
from .models import User
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

#########Admin Dashboard###################

from rest_framework.views import APIView
from rest_framework.response import Response
from users.permissions import IsAdmin

class AdminDashboardView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        return Response({"message": "Welcome to the Admin Dashboard"})