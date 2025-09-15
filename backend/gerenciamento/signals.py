from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import Auditoria, Requisicao, Protocolo, Equipamento, Laudo

def registrar_auditoria(instance, acao, dados_antigos=None):
    """Função para registrar auditoria automaticamente"""
    Auditoria.objects.create(
        tabela_afetada=instance.__class__.__name__,
        id_registro=instance.id,
        acao=acao,
        dados_antigos=dados_antigos
    )

@receiver(pre_save, sender=Requisicao)
@receiver(pre_save, sender=Protocolo)
@receiver(pre_save, sender=Equipamento)
@receiver(pre_save, sender=Laudo)
def salvar_dados_antigos(sender, instance, **kwargs):
    """Salva dados antigos antes de atualizar"""
    if instance.pk:  # Se já existe (update)
        try:
            original = sender.objects.get(pk=instance.pk)
            instance._dados_antigos = {
                field.name: getattr(original, field.name)
                for field in sender._meta.fields
            }
        except sender.DoesNotExist:
            pass

@receiver(post_save, sender=Requisicao)
@receiver(post_save, sender=Protocolo)
@receiver(post_save, sender=Equipamento)
@receiver(post_save, sender=Laudo)
def auditar_criacao_edicao(sender, instance, created, **kwargs):
    """Auditar criação e edição de registros"""
    if created:
        registrar_auditoria(instance, 'INSERT')
    else:
        dados_antigos = getattr(instance, '_dados_antigos', None)
        registrar_auditoria(instance, 'UPDATE', dados_antigos)

@receiver(post_delete, sender=Requisicao)
@receiver(post_delete, sender=Protocolo)
@receiver(post_delete, sender=Equipamento)
@receiver(post_delete, sender=Laudo)
def auditar_exclusao(sender, instance, **kwargs):
    """Auditar exclusão de registros"""
    registrar_auditoria(instance, 'DELETE')