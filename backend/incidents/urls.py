from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IncidentViewSet, IncidentUpdateViewSet

router = DefaultRouter()
router.register(r'reports', IncidentViewSet, basename='report')
router.register(r'updates', IncidentUpdateViewSet, basename='incidentupdate')

urlpatterns = [
    path('', include(router.urls)),
]
