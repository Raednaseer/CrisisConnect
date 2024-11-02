from django.urls import path,include
from .views import testview

urlpatterns = [
    path('',testview,name='test'),
]