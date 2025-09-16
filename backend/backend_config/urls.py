# backend/backend_config/urls.py

from django.contrib import admin
from django.urls import path, include # <-- 1. Adicione 'include' aqui

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('requisicoes.urls')), # <-- 2. Adicione esta linha
]
