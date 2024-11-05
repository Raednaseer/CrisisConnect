from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsResponder(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'responder'

class IsVictim(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'victim'
