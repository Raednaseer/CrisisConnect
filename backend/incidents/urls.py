from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IncidentViewSet,LocationListView

router = DefaultRouter()
router.register(r'incidents', IncidentViewSet)
router.register(r'location',LocationListView,basename='location')

urlpatterns = [
    path('', include(router.urls)),
]
