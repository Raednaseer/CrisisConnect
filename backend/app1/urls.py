from django.urls import path,include
from rest_framework import routers
from .views import *
from . import views

router=routers.DefaultRouter()
router.register(r'transportation',TransportationViewSet),
router.register(r'shelters',SheltersViewSet)
router.register(r'ngo',NGOViewSet)
router.register(r'transport_request',TransportRequestViewSet)
 

urlpatterns = [
    path('',include(router.urls)),
    # Path for getting nearby vehicles based on user location
    path('nearby-vehicles/', views.get_nearby_vehicles, name='get_nearby_vehicles'),
    path('accept-transport-request/<int:request_id>/', views.accept_transport_request, name='accept_transport_request'),
    path('user-requests/', views.user_requests, name='user_requests'),
]