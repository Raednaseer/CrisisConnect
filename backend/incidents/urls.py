from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IncidentViewSet,UserReportsView,ResponderAssignedView

router = DefaultRouter()
router.register(r'incidents', IncidentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user-reports/', UserReportsView.as_view(), name='user-reports'),
    path('responder-assigned/',ResponderAssignedView.as_view(), name='responder-assigned')
]
