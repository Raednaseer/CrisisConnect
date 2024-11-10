from django.urls import path,include
from rest_framework import routers
from .views import *
from . import views

router=routers.DefaultRouter()
router.register(r'transportation',TransportationViewSet),
router.register(r'shelters',SheltersViewSet)
router.register(r'ngo',NGOViewSet)

urlpatterns = [
    path('',include(router.urls)),
    # Path for getting nearby vehicles based on user location
    path('nearby-vehicles/', views.get_nearby_vehicles, name='get_nearby_vehicles'),

    # Path for accepting a transport request (POST request to accept a request)
    path('accept-transport-request/<int:request_id>/', views.accept_transport_request, name='accept_transport_request'),

    # Path for getting the current user's transport requests
    path('user-requests/', views.user_requests, name='user_requests'),
]