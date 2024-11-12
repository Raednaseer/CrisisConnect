# users/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, UserListView, ResponderListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user-list/',UserListView.as_view(),name='user-list'),
    path('responder-list/',ResponderListView.as_view(),name='responder-list')
]
