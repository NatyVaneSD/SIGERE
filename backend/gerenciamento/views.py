from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import *
from .serializers import *

# ViewSets para CRUD completo
class UnidadeSolicitanteViewSet(viewsets.ModelViewSet):
    queryset = UnidadeSolicitante.objects.all()
    serializer_class = UnidadeSolicitanteSerializer

class SolicitanteViewSet(viewsets.ModelViewSet):
    queryset = Solicitante.objects.all()
    serializer_class = SolicitanteSerializer

class TipoExameViewSet(viewsets.ModelViewSet):
    queryset = TipoExame.objects.all()
    serializer_class = TipoExameSerializer

class PeritoViewSet(viewsets.ModelViewSet):
    queryset = Perito.objects.all()
    serializer_class = PeritoSerializer

class RequisicaoViewSet(viewsets.ModelViewSet):
    queryset = Requisicao.objects.all()
    serializer_class = RequisicaoSerializer
    
    @action(detail=False, methods=['get'])
    def por_status(self, request):
        status = request.query_params.get('status', None)
        if status:
            requisicoes = Requisicao.objects.filter(status_requisicao=status)
            serializer = self.get_serializer(requisicoes, many=True)
            return Response(serializer.data)
        return Response([])
    
    @action(detail=False, methods=['get'])
    def por_periodo(self, request):
        data_inicio = request.query_params.get('inicio', None)
        data_fim = request.query_params.get('fim', None)
        
        if data_inicio and data_fim:
            requisicoes = Requisicao.objects.filter(
                data_recebimento__range=[data_inicio, data_fim]
            )
            serializer = self.get_serializer(requisicoes, many=True)
            return Response(serializer.data)
        return Response([])

class ProtocoloViewSet(viewsets.ModelViewSet):
    queryset = Protocolo.objects.all()
    serializer_class = ProtocoloSerializer
    
    @action(detail=False, methods=['get'])
    def por_perito(self, request):
        perito_id = request.query_params.get('perito_id', None)
        if perito_id:
            protocolos = Protocolo.objects.filter(perito_id=perito_id)
            serializer = self.get_serializer(protocolos, many=True)
            return Response(serializer.data)
        return Response([])

class TipoEquipamentoViewSet(viewsets.ModelViewSet):
    queryset = TipoEquipamento.objects.all()
    serializer_class = TipoEquipamentoSerializer

class ArmazenamentoViewSet(viewsets.ModelViewSet):
    queryset = Armazenamento.objects.all()
    serializer_class = ArmazenamentoSerializer

class EquipamentoViewSet(viewsets.ModelViewSet):
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoSerializer
    
    @action(detail=False, methods=['get'])
    def por_armazenamento(self, request):
        armazenamento_id = request.query_params.get('armazenamento_id', None)
        if armazenamento_id:
            equipamentos = Equipamento.objects.filter(local_armazenamento_id=armazenamento_id)
            serializer = self.get_serializer(equipamentos, many=True)
            return Response(serializer.data)
        return Response([])

class LaudoViewSet(viewsets.ModelViewSet):
    queryset = Laudo.objects.all()
    serializer_class = LaudoSerializer

class AuditoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer
    
    @action(detail=False, methods=['get'])
    def por_tabela(self, request):
        tabela = request.query_params.get('tabela', None)
        if tabela:
            auditorias = Auditoria.objects.filter(tabela_afetada=tabela)
            serializer = self.get_serializer(auditorias, many=True)
            return Response(serializer.data)
        return Response([])

# Views customizadas para endpoints específicos
@api_view(['GET'])
def dashboard_estatisticas(request):
    """Endpoint para estatísticas do dashboard"""
    total_requisicoes = Requisicao.objects.count()
    requisicoes_espera = Requisicao.objects.filter(status_requisicao='ESPERA').count()
    requisicoes_processamento = Requisicao.objects.filter(status_requisicao='PROCESSAMENTO').count()
    requisicoes_entregue = Requisicao.objects.filter(status_requisicao='ENTREGUE').count()
    
    return Response({
        'total_requisicoes': total_requisicoes,
        'em_espera': requisicoes_espera,
        'em_processamento': requisicoes_processamento,
        'entregues': requisicoes_entregue,
    })

@api_view(['POST'])
def criar_requisicao_completa(request):
    """Cria uma requisição com todos os dados relacionados"""
    try:
        # Lógica para criar requisição completa
        # Implemente conforme sua necessidade
        return Response({'message': 'Requisição criada com sucesso'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)