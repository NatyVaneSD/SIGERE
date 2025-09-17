from rest_framework import serializers
from .models import Requisicao, Material

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'tipo_equipamento', 'quantidade', 'local_armazenamento', 'prateleira']

class RequisicaoSerializer(serializers.ModelSerializer):
    materiais = MaterialSerializer(many=True)

    class Meta:
        model = Requisicao
        fields = '__all__'

    def create(self, validated_data):
        materiais_data = validated_data.pop('materiais')
        requisicao = Requisicao.objects.create(**validated_data)
        for material_data in materiais_data:
            Material.objects.create(requisicao=requisicao, **material_data)
        return requisicao