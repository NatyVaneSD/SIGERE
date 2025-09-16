"""
URL configuration for SIGERE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gerenciamento import views

router = DefaultRouter()
router.register(r'unidades-solicitantes', views.UnidadeSolicitanteViewSet)
router.register(r'solicitantes', views.SolicitanteViewSet)
router.register(r'tipos-exame', views.TipoExameViewSet)
router.register(r'peritos', views.PeritoViewSet)
router.register(r'requisicoes', views.RequisicaoViewSet)
router.register(r'protocolos', views.ProtocoloViewSet)
router.register(r'tipos-equipamento', views.TipoEquipamentoViewSet)
router.register(r'armazenamentos', views.ArmazenamentoViewSet)
router.register(r'equipamentos', views.EquipamentoViewSet)
router.register(r'laudos', views.LaudoViewSet)
router.register(r'auditoria', views.AuditoriaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/estatisticas/', views.dashboard_estatisticas),
    path('requisicoes/completa/', views.criar_requisicao_completa),
]