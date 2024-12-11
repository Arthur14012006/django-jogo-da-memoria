from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView  
from django.urls import path
from jogo import views

urlpatterns = [
    path('admin/', admin.site.urls),  
    path('', views.inicio, name='inicio'),  
    path('login/', LoginView.as_view(template_name='admin/login.html'), name='login'),  
    path('jogo/', views.jogo, name='jogo'),  
    path('ranking/', views.ranking, name='ranking'),
    path('sair/', views.sair, name='sair'),
]
