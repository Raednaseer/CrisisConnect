# Create your views here.
from rest_framework import generics,status
from .serializers import RegisterSerializer,UserListSerializer
from .models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .permissions import IsAdmin


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'role': user.role,
                    'phone_no' : user.phone_no,
                }
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserListView(APIView):
    permission_classes = [IsAdmin] 

    def get(self, request):
        queryset = User.objects.all()
        serializer = UserListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ResponderListView(APIView):
    permission_classes = [IsAdmin] 

    def get(self, request):
        queryset = User.objects.filter(role = 'responder')
        serializer = UserListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)