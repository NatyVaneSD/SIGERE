from rest_framework import viewsets, permissions
from .models import Requisicao
from .serializers import RequisicaoSerializer

class RequisicaoViewSet(viewsets.ModelViewSet):
    queryset = Requisicao.objects.all()
    serializer_class = RequisicaoSerializer
    permission_classes = [permissions.IsAuthenticated]