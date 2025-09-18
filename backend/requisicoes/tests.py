from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Requisicao, Material

User = get_user_model()

class RequisicaoAPITests(APITestCase):
    def setUp(self):
        # Cria um usuário de teste para autenticação
        self.user = User.objects.create_user(username='admin', password='Nat#22194')
        self.client.force_authenticate(user=self.user)
        self.list_url = reverse('requisicao-list')
        
        # Cria uma instância de Requisição para ser usada nos testes GET
        self.requisicao1 = Requisicao.objects.create(
            tipo_documento='Ofício',
            numero_documento='123456789',
            numero_requisicao='GET-TEST-001',
            data_requisicao='2024-05-15',
            solicitante='Tester',
            unidade_solicitante='Unidade de Testes',
            tipo_exame='Análise de conteúdo',
            nivel_prioridade='Prioridade 1',
            status='Pendente',
        )
        self.requisicao2 = Requisicao.objects.create(
            tipo_documento='BO',
            numero_documento='987654321',
            numero_requisicao='GET-TEST-002',
            data_requisicao='2024-05-16',
            solicitante='Tester 2',
            unidade_solicitante='Outra Unidade',
            tipo_exame='Extração de conteúdo',
            nivel_prioridade='Prioridade 2',
            status='Pendente',
        )
        self.detail_url = reverse('requisicao-detail', kwargs={'pk': self.requisicao1.pk})

    def test_create_valid_requisicao(self):
        """ Testa a criação de uma requisição com dados válidos (POST). """
        payload = {
            'tipo_documento': 'Ofício',
            'numero_documento': '123456789',
            'numero_requisicao': 'POST-TEST-001',
            'data_requisicao': '2024-05-17',
            'solicitante': 'Teste POST',
            'unidade_solicitante': 'Unidade POST',
            'tipo_exame': 'Perícia Digital',
            'nivel_prioridade': 'Baixa',
            'status': 'Pendente',
            'materiais': [
                {
                    'tipo_equipamento': 'HD Externo',
                    'quantidade': 1,
                    'local_armazenamento': 'Sala 101',
                }
            ]
        }
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Requisicao.objects.count(), 3)
        self.assertEqual(Material.objects.count(), 1)
        
    def test_create_invalid_requisicao(self):
        """ Testa a falha na criação de uma requisição com dados inválidos (POST). """
        payload = {'tipo_documento': ''}
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauthenticated_access(self):
        """ Testa se a API rejeita requisições sem autenticação. """
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_get_requisicao_list(self):
        """ Testa se a API retorna a lista completa de requisições (GET /api/requisicoes/). """
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        
    def test_get_requisicao_detail(self):
        """ Testa se a API retorna os detalhes de uma requisição específica (GET /api/requisicoes/{id}/). """
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['numero_requisicao'], 'GET-TEST-001')