from django.db import models
from django.contrib import auth

class Partida(models.Model):
    nome_jogador = models.CharField(max_length=100, unique=True)  
    tentativas = models.PositiveIntegerField()
    tempo = models.PositiveIntegerField(null=True, blank=True)
    data_hora = models.DateTimeField(auto_now=True) 
    user = models.ForeignKey(auth.get_user_model(), on_delete=models.CASCADE)

    class Meta:
        ordering = ['tentativas', 'tempo', '-data_hora']

    def __str__(self):
        return f'{self.nome_jogador} - {self.tentativas} tentativas'

