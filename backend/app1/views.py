from django.shortcuts import render
from rest_framework import viewsets
from .models import Transportation,Shelters,NGO
from .serializers import TransportationSerializer,SheltersSerializer,NGOSerializer, TransportRequestSerializer,UserTransportRequestSerializer
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

import math
 
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of the Earth in km
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(d_lon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

from rest_framework.decorators import api_view
from .models import TransportRequest
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from users.models import User

from rest_framework.response import Response

from .utils import calculate_distance  # Import your distance function
 
@api_view(['POST'])
def get_nearby_vehicles(request):
    latitude = float(request.data.get('latitude'))
    longitude = float(request.data.get('longitude'))
    vehicle_type = request.data.get('vehicle_type')
    radius_km = 5  # Define radius for filtering
    username = request.data.get('username')
    phone_no = request.data.get('phone_no')
 
    # Validate request data
    if not (username and phone_no and latitude and longitude and vehicle_type):
        return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)
 
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
 
    vehicles = Transportation.objects.filter(vehicle_type=vehicle_type, current_status='available')
 
    nearby_vehicles = []
    for vehicle in vehicles:
        vehicle_lat = float(vehicle.latitude)
        vehicle_lon = float(vehicle.longitude)
       
        # Calculate the distance
        distance = calculate_distance(latitude, longitude, vehicle_lat, vehicle_lon)
       
        if distance <= radius_km:
            # Save each nearby vehicle to TransportRequest
            transport_request = TransportRequest(
                username=user.username,
                phone_no=user.phone_no,
                vehicle=vehicle,
                latitude=latitude,
                longitude=longitude,
                distance=distance,
                timestamp=timezone.now(),
                request_status="pending"
            )
            transport_request.save()
           
            # Add vehicle to response data
            nearby_vehicles.append({
                "vehicle_id": vehicle.vehicle_id,
                "license_plate": vehicle.license_plate,
                "vehicle_type": vehicle.vehicle_type,
                "current_status": vehicle.current_status,
                "latitude": vehicle.latitude,
                "longitude": vehicle.longitude,
                "distance": round(distance, 2),
                "contact_info" : vehicle.contact_info
            })
 
    return JsonResponse(nearby_vehicles, safe=False)

    
@api_view(['POST'])
def accept_transport_request(request, request_id):
    transport_request = get_object_or_404(TransportRequest, id=request_id, vehicle__owner=request.user)
    
    if transport_request.request_status != 'pending':
        return Response({"error": "This request has already been processed."}, status=status.HTTP_400_BAD_REQUEST)
    
    transport_request.request_status = 'accepted'
    transport_request.user_alert = True  # Flag user to notify of change
    transport_request.save()

    # Serialize and return the updated transport request data
    serializer = TransportRequestSerializer(transport_request)
    
    return Response({"message": "Request accepted successfully.", "request": serializer.data})



@api_view(['GET'])
def user_requests(request):
    requests = TransportRequest.objects.filter(user=request.user).order_by('-timestamp')
    serializer = UserTransportRequestSerializer(requests, many=True)
    return Response(serializer.data)

class TransportRequestViewSet(viewsets.ModelViewSet):
    queryset=TransportRequest.objects.all()
    serializer_class=TransportRequestSerializer