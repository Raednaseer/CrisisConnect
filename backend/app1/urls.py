from django.urls import path,include
from rest_framework import routers
from .views import *

router=routers.DefaultRouter()
router.register(r'transportation',TransportationViewSet),
router.register(r'shelters',SheltersViewSet)
router.register(r'ngo',NGOViewSet)

urlpatterns = [
    path('',include(router.urls)),
]