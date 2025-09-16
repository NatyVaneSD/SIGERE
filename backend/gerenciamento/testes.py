from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import *
import json

class UnidadeSolicitanteAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('unidadesolicitante-list')
    
    def test_criar_unidade_solicitante_com_sucesso(self):
        data = {'nome_UnidadeSolicitante': 'unidade de teste'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nome_UnidadeSolicitante'], 'UNIDADE DE TESTE')

class SolicitanteAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.unidade = UnidadeSolicitante.objects.create(nome_UnidadeSolicitante="UNIDADE POLICIAL")
        self.url = reverse('solicitante-list')
    
    def test_criar_solicitante_com_sucesso(self):
        data = {
            'nome_solicitante': 'joao da silva',
            'unidade_solicitante': self.unidade.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nome_solicitante'], 'JOAO DA SILVA')
        self.assertEqual(response.data['unidade_solicitante_nome'], 'UNIDADE POLICIAL')

class PeritoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('perito-list')

    def test_criar_perito_com_sucesso(self):
        data = {'nome': 'Perito Teste'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Perito.objects.count(), 1)

class RequisicaoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.unidade = UnidadeSolicitante.objects.create(nome_UnidadeSolicitante="UNIDADE TESTE")
        self.solicitante = Solicitante.objects.create(nome_solicitante="SOLICITANTE TESTE", unidade_solicitante=self.unidade)
        self.tipo_exame = TipoExame.objects.create(nome_exame="EXAME TESTE")
        self.url = reverse('requisicao-list')

    def test_criar_requisicao_com_oficio_valido(self):
        valid_data = {
            "tipo_documento": "OF",
            "numero_documento": "12345/2024",
            "numero_caso": "2024.000001",
            "data_requisicao": "2024-01-01",
            "data_recebimento": "2024-01-02",
            "objetivo_pericia": "TESTE DE PERICIA",
            "status_requisicao": "ESPERA",
            "peso_requisicao": "P1",
            "solicitante": self.solicitante.id,
            "tipo_exame": self.tipo_exame.id
        }
        response = self.client.post(self.url, valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Requisicao.objects.count(), 1)

    def test_nao_criar_requisicao_com_oficio_invalido(self):
        invalid_data = {
            "tipo_documento": "OF",
            "numero_documento": "12345-2024",
            "numero_caso": "2024.000003",
            "data_requisicao": "2024-01-01",
            "data_recebimento": "2024-01-02",
            "objetivo_pericia": "TESTE DE PERICIA",
            "status_requisicao": "ESPERA",
            "peso_requisicao": "P1",
            "solicitante": self.solicitante.id,
            "tipo_exame": self.tipo_exame.id
        }
        response = self.client.post(self.url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('numero_documento', response.data)

class ProtocoloAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.unidade = UnidadeSolicitante.objects.create(nome_UnidadeSolicitante="UNIDADE TESTE")
        self.solicitante = Solicitante.objects.create(nome_solicitante="SOLICITANTE TESTE", unidade_solicitante=self.unidade)
        self.tipo_exame = TipoExame.objects.create(nome_exame="EXAME TESTE")
        self.requisicao = Requisicao.objects.create(
            tipo_documento="OF", numero_documento="12345/2024", numero_caso="2024.000001",
            data_requisicao="2024-01-01", data_recebimento="2024-01-02", objetivo_pericia="Teste",
            status_requisicao="ESPERA", peso_requisicao="P1", solicitante=self.solicitante,
            tipo_exame=self.tipo_exame
        )
        self.url = reverse('protocolo-list')

    def test_criar_protocolo_com_sucesso(self):
        data = {
            'numero_protocolo': '2024.01.000001',
            'data_protocolo': '2024-01-03',
            'requisicao': self.requisicao.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Protocolo.objects.count(), 1)

    def test_nao_criar_protocolo_com_formato_invalido(self):
        data = {
            'numero_protocolo': '2024.01.123',
            'data_protocolo': '2024-01-03',
            'requisicao': self.requisicao.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('numero_protocolo', response.data)

class EquipamentoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.unidade = UnidadeSolicitante.objects.create(nome_UnidadeSolicitante="UNIDADE TESTE")
        self.solicitante = Solicitante.objects.create(nome_solicitante="SOLICITANTE TESTE", unidade_solicitante=self.unidade)
        self.tipo_exame = TipoExame.objects.create(nome_exame="EXAME TESTE")
        self.tipo_equipamento_smartphone = TipoEquipamento.objects.create(tipo="SMARTPHONE")
        self.tipo_equipamento_outros = TipoEquipamento.objects.create(tipo="OUTROS", outros_tipo="SSD EXTERNO")
        self.local_armazenamento = Armazenamento.objects.create(deposito="D1", prateleira="A")
        self.url = reverse('equipamento-list')
        self.requisicao = Requisicao.objects.create(
            tipo_documento="OF", numero_documento="12345/2024", numero_caso="2024.000001",
            data_requisicao="2024-01-01", data_recebimento="2024-01-02", objetivo_pericia="Teste",
            status_requisicao="ESPERA", peso_requisicao="P1", solicitante=self.solicitante,
            tipo_exame=self.tipo_exame
        )
        self.protocolo = Protocolo.objects.create(numero_protocolo="2024.01.000001", requisicao=self.requisicao)

    def test_criar_material_com_sucesso(self):
        valid_data = {
            "tipo_equipamento": self.tipo_equipamento_smartphone.id,
            "quant_equipamento": 1,
            "local_armazenamento": self.local_armazenamento.id,
            "protocolo": self.protocolo.id
        }
        response = self.client.post(self.url, valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Equipamento.objects.count(), 1)

    def test_nao_criar_material_com_quantidade_invalida(self):
        invalid_data = {
            "tipo_equipamento": self.tipo_equipamento_smartphone.id,
            "quant_equipamento": 51,
            "local_armazenamento": self.local_armazenamento.id,
            "protocolo": self.protocolo.id
        }
        response = self.client.post(self.url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('quant_equipamento', response.data)

class ArmazenamentoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('armazenamento-list')

    def test_criar_armazenamento_com_sucesso(self):
        data = {
            'deposito': 'D2',
            'prateleira': 'C'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Armazenamento.objects.count(), 1)
        self.assertEqual(response.data['deposito_display'], 'Depósito 2')

class TipoEquipamentoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('tipoequipamento-list')
    
    def test_nao_criar_tipo_equipamento_outros_invalido(self):
        invalid_data = {
            "tipo": "OUTROS",
            "outros_tipo": "ssd123"
        }
        response = self.client.post(self.url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('outros_tipo', response.data)