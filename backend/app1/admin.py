from django.contrib import admin
from .models import Transportation,Shelters,NGO,TransportRequest

# Register your models here.
admin.site.register(Transportation)
admin.site.register(Shelters)
admin.site.register(NGO)
admin.site.register(TransportRequest)