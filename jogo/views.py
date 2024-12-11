from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .models import Partida
from django.db.models import Max

def inicio(request):
    if request.user.is_authenticated:
        logout(request) 
    return render(request, 'jogo/inicio.html')

@login_required(login_url='/login/') 
def jogo(request):
    if request.method == 'POST':
        tentativas = int(request.POST.get('tentativas'))
        tempo = int(request.POST.get('tempo', 0)) 
        nome_jogador = request.user.username

        partida, created = Partida.objects.update_or_create(
            nome_jogador=nome_jogador,
            defaults={'tentativas': tentativas, 'tempo': tempo, 'user': request.user},
        )

    return render(request, 'jogo/jogo.html', {'usuario': request.user.username})

def ranking(request):
    partidas = Partida.objects.values('nome_jogador').annotate(
        ultima_partida=Max('data_hora'),
        tentativas=Max('tentativas'),
        tempo=Max('tempo'),
    ).order_by('tentativas', '-data_hora')
    return render(request, 'jogo/ranking.html', {'partidas': partidas})

def sair(request):
    logout(request)
    return redirect('inicio')  

def login_redirect(request):
    if request.user.is_authenticated:
        return redirect('/jogo/')  
    return redirect('/admin/') 