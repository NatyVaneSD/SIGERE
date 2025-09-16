from rest_framework import serializers
from .models import *
import re

class UnidadeSolicitanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadeSolicitante
        fields = '__all__'

    def validate_nome_UnidadeSolicitante(self, value):
        return value.upper()

class SolicitanteSerializer(serializers.ModelSerializer):
    unidade_solicitante_nome = serializers.CharField(source='unidade_solicitante.nome_UnidadeSolicitante', read_only=True)
    
    class Meta:
        model = Solicitante
        fields = '__all__'

    def validate_nome_solicitante(self, value):
        return value.upper()

class TipoExameSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoExame
        fields = '__all__'

class PeritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perito
        fields = '__all__'

class RequisicaoSerializer(serializers.ModelSerializer):
    solicitante_nome = serializers.CharField(source='solicitante.nome_solicitante', read_only=True)
    tipo_exame_nome = serializers.CharField(source='tipo_exame.nome_exame', read_only=True)
    status_display = serializers.CharField(source='get_status_requisicao_display', read_only=True)
    peso_display = serializers.CharField(source='get_peso_requisicao_display', read_only=True)
    tipo_documento_display = serializers.CharField(source='get_tipo_documento_display', read_only=True)
    
    class Meta:
        model = Requisicao
        fields = '__all__'
        extra_kwargs = {
            'numero_caso': {'validators': []}
        }

    def validate(self, data):
        """Validações de formato baseadas no tipo de documento."""
        numero_documento = data.get('numero_documento')
        tipo_documento = data.get('tipo_documento')

        # Corrigido: Usar 'OF', 'BOP', 'IPL' conforme o choices do models.py
        if tipo_documento == 'OF' and not re.match(r'^\d{5}/\d{4}$', numero_documento):
            raise serializers.ValidationError({"numero_documento": "Formato do Ofício inválido. Use NNNNN/NNNN."})
        
        elif tipo_documento == 'BOP' and not re.match(r'^\d{5}\.\d{5}-\d{2}$', numero_documento):
            raise serializers.ValidationError({"numero_documento": "Formato do BO inválido. Use NNNNN.NNNNN-NN."})
            
        elif tipo_documento == 'IPL' and not re.match(r'^\d{4}\.\d{3}\.\d{3}-\d{2}$', numero_documento):
            raise serializers.ValidationError({"numero_documento": "Formato do IPL inválido. Use NNNN.NNN.NNN-NN."})

        # Validações dos outros campos
        # Removido: 'numero_requisicao' não existe no modelo
        
        if 'numero_caso' in data and not re.match(r'^\d{4}\.\d{6}$', data['numero_caso']):
            raise serializers.ValidationError({"numero_caso": "Formato inválido. Use NNNN.NNNNNN."})
            
        return data

class ProtocoloSerializer(serializers.ModelSerializer):
    requisicao_numero = serializers.CharField(source='requisicao.numero_caso', read_only=True)
    perito_nome = serializers.CharField(source='perito.nome', read_only=True)
    
    class Meta:
        model = Protocolo
        fields = '__all__'
    
    def validate_numero_protocolo(self, value):
        if not re.match(r'^\d{4}\.\d{2}\.\d{6}$', value):
            raise serializers.ValidationError("Formato do protocolo inválido. Use NNNN.NN.NNNNNN.")
        return value

class TipoEquipamentoSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    
    class Meta:
        model = TipoEquipamento
        fields = '__all__'
        
    def validate(self, data):
        """Validação condicional para o campo 'outros_tipo'."""
        tipo = data.get('tipo')
        outros_tipo = data.get('outros_tipo', '')

        if tipo == 'OUTROS':
            if not outros_tipo or not re.match(r'^[A-Z\s]+$', outros_tipo):
                raise serializers.ValidationError({"outros_tipo": "Para o tipo 'OUTROS', o campo 'outros_tipo' deve ser preenchido e conter apenas letras maiúsculas."})
        
        return data

class ArmazenamentoSerializer(serializers.ModelSerializer):
    deposito_display = serializers.CharField(source='get_deposito_display', read_only=True)
    
    class Meta:
        model = Armazenamento
        fields = '__all__'

class EquipamentoSerializer(serializers.ModelSerializer):
    tipo_equipamento_nome = serializers.CharField(source='tipo_equipamento.__str__', read_only=True)
    local_armazenamento_nome = serializers.CharField(source='local_armazenamento.__str__', read_only=True)
    protocolo_numero = serializers.CharField(source='protocolo.numero_protocolo', read_only=True)
    
    class Meta:
        model = Equipamento
        fields = '__all__'

    def validate_quant_equipamento(self, value):
        if not isinstance(value, int) or value <= 0 or value > 50:
            raise serializers.ValidationError("A quantidade deve ser um número inteiro entre 1 e 50.")
        return value

class LaudoSerializer(serializers.ModelSerializer):
    protocolo_numero = serializers.CharField(source='protocolo.numero_protocolo', read_only=True)
    peritos_nomes = serializers.SerializerMethodField()
    equipamentos_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Laudo
        fields = '__all__'
    
    def get_peritos_nomes(self, obj):
        return [perito.nome for perito in obj.peritos.all()]
    
    def get_equipamentos_info(self, obj):
        return [f"{eq.tipo_equipamento} - Qtd: {eq.quant_equipamento}" for eq in obj.equipamentos.all()]

class AuditoriaSerializer(serializers.ModelSerializer):
    acao_display = serializers.CharField(source='get_acao_display', read_only=True)
    
    class Meta:
        model = Auditoria
        fields = '__all__'