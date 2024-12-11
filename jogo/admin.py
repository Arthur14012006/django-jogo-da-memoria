from django.contrib import admin
from .models import Partida

class PartidaFilter(admin.ModelAdmin):
    list_display=["nome_jogador", "tentativas", "tempo", "data_hora"]

admin.site.register(Partida, PartidaFilter)