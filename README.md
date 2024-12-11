1) Crie o ambiente virtual e ative-o:
- pip install virtualenv
- python -m venv .venv
- source .venv/Scripts/activate

2) Baixe as dependências:
- pip install -r requirements.txt

3) Na raiz do projeto, crie um arquivo .env e adicione sua secret key

4) Rode o projeto:
- python manage.py runserver

5) Acesse a aplicação no seu navegador: http://127.0.0.1:8000/
