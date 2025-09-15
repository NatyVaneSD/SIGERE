# gerenciamento/admin.py
from django.contrib import admin
from .models import *

@admin.register(Requisicao)
class RequisicaoAdmin(admin.ModelAdmin):
    list_display = ['numero_caso', 'tipo_documento', 'status_requisicao', 'data_recebimento', 'peso_requisicao']
    list_filter = ['status_requisicao', 'peso_requisicao', 'data_recebimento', 'tipo_documento']
    search_fields = ['numero_caso', 'pae_requisicao']
    readonly_fields = ['data_criacao', 'data_atualizacao']
    date_hierarchy = 'data_recebimento'

@admin.register(Protocolo)
class ProtocoloAdmin(admin.ModelAdmin):
    list_display = ['numero_protocolo', 'requisicao', 'perito', 'data_entrega_perito']
    list_filter = ['data_entrega_perito', 'perito']
    search_fields = ['numero_protocolo', 'requisicao__numero_caso']
    raw_id_fields = ['requisicao', 'perito']
    readonly_fields = ['data_criacao']

@admin.register(Equipamento)
class EquipamentoAdmin(admin.ModelAdmin):
    list_display = ['tipo_equipamento', 'quant_equipamente', 'protocolo', 'local_armazenamento']
    list_filter = ['tipo_equipamento', 'local_armazenamento']
    search_fields = ['protocolo__numero_protocolo']
    raw_id_fields = ['protocolo', 'local_armazenamento']
    readonly_fields = ['data_cadastro']

@admin.register(Laudo)
class LaudoAdmin(admin.ModelAdmin):
    list_display = ['numero_laudo', 'protocolo', 'data_entrega_expedicao', 'anexo_digital']
    list_filter = ['data_entrega_expedicao', 'anexo_digital']
    search_fields = ['numero_laudo', 'protocolo__numero_protocolo']
    filter_horizontal = ['peritos', 'equipamentos']
    raw_id_fields = ['protocolo']
    readonly_fields = ['data_criacao']

@admin.register(Auditoria)
class AuditoriaAdmin(admin.ModelAdmin):
    list_display = ['tabela_afetada', 'id_registro', 'acao', 'data_hora']
    list_filter = ['tabela_afetada', 'acao', 'data_hora']
    search_fields = ['tabela_afetada', 'id_registro']
    readonly_fields = ['tabela_afetada', 'id_registro', 'acao', 'dados_antigos', 'data_hora']
    date_hierarchy = 'data_hora'
    
    # Impedir criação e edição pelo admin
    def has_add_permission(self, request):
        return False
        
    def has_change_permission(self, request, obj=None):
        return False
        
    def has_delete_permission(self, request, obj=None):
        return False
    
@admin.register(UnidadeSolicitante)
class UnidadeSolicitanteAdmin(admin.ModelAdmin):
    list_display = ['nome_UnidadeSolicitante']
    search_fields = ['nome_UnidadeSolicitante']

@admin.register(Solicitante)
class SolicitanteAdmin(admin.ModelAdmin):
    list_display = ['nome_solicitante', 'unidade_solicitante']
    list_filter = ['unidade_solicitante']
    search_fields = ['nome_solicitante']
    raw_id_fields = ['unidade_solicitante']

@admin.register(TipoExame)
class TipoExameAdmin(admin.ModelAdmin):
    list_display = ['nome_exame']
    search_fields = ['nome_exame']

@admin.register(Perito)
class PeritoAdmin(admin.ModelAdmin):
    list_display = ['nome']
    search_fields = ['nome']

@admin.register(TipoEquipamento)
class TipoEquipamentoAdmin(admin.ModelAdmin):
    list_display = ['tipo', 'outros_tipo']
    list_filter = ['tipo']
    search_fields = ['tipo', 'outros_tipo']

@admin.register(Armazenamento)
class ArmazenamentoAdmin(admin.ModelAdmin):
    list_display = ['deposito', 'prateleira']
    list_filter = ['deposito']
    search_fields = ['deposito', 'prateleira']