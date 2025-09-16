# backend/requisicoes/models.py
from django.db import models

class Requisicao(models.Model):
    # Campos do formulário de Requisição
    tipo_documento = models.CharField(max_length=50)
    numero_documento = models.CharField(max_length=100)
    numero_requisicao = models.CharField(max_length=100, unique=True)
    data_requisicao = models.DateField()
    solicitante = models.CharField(max_length=200)
    unidade_solicitante = models.CharField(max_length=200)
    tipo_exame = models.CharField(max_length=100)
    data_recebimento = models.DateField(blank=True, null=True)
    numero_protocolo = models.CharField(max_length=100, blank=True, null=True)
    numero_caso = models.CharField(max_length=100, blank=True, null=True)
    nivel_prioridade = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='Pendente')

    def __str__(self):
        return f"Requisição Nº {self.numero_requisicao}"

class Material(models.Model):
    # Relacionamento com a Requisição
    requisicao = models.ForeignKey(Requisicao, on_delete=models.CASCADE, related_name='materiais')

    # Campos do formulário de Material
    tipo_equipamento = models.CharField(max_length=100)
    outros_tipo_equipamento = models.CharField(max_length=100, blank=True, null=True) # Campo novo para "Outros"
    quantidade = models.PositiveIntegerField(default=1)
    local_armazenamento = models.CharField(max_length=100)
    prateleira = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.tipo_equipamento} (Requisição: {self.requisicao.numero_requisicao})"