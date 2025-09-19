## SIGERE – Sistema Integrado de Gerenciamento de Requisições 
Atualmente, a Gerência de Perícia em Informática (GPI) utiliza planilhas do 
Excel para controlar requisições de perícia em dispositivos eletrônicos. Essa abordagem 
manual apresenta diversos desafios, como risco de perda de dados, dificuldade de 
acesso simultâneo por múltiplos usuários, falta de rastreabilidade de alterações e 
processos demorados para gerar relatórios. 
O SIGERE surge como solução para automatizar todo o ciclo de vida das requisições, 
desde o cadastro até a geração de relatórios. O sistema garantirá maior segurança, 
eficiência e transparência nos processos, substituindo definitivamente as planilhas e 
eliminando os problemas atuais.

## Desenvolvedores

2023006804 – Natalia Macedo - (Scrum Master)

2023007276 – Cynthia Pantoja de Melo Neiva - (Desenvolverdor Frontend)

2023007169 – Luiz Reis Ferreira Neto - (Desenvolverdor Frontend)

2023006690 – Vinicius Yoshimitsu Aoki Alves - (Desenvolverdor Full-Stack)

2023007338 – Rafael Tavares Negrão Braga - (Desenvolverdor Frontend)

2023007211 – Iuri Oliveira Matos da Silva - (Desenvolverdor Full-Stack)

## Tecnologias Utilizadas

- **Linguagens de Programação:** Python, JavaScript  
- **Frameworks e Bibliotecas:** Django, React.js  
- **Banco de Dados:** SQLite
- **Ferramentas:**  
  - Controle de Versão: Git + GitHub  
  - Testes de API: Postman 
  - Gerenciamento de Dependências: Pip + Poetry  
  - Integração Contínua / Entrega Contínua (CI/CD): GitHub Actions  
  - Qualidade de Código:Pylint  

## Instalação e Execução

### Passos para rodar o projeto localmente:

1. Clone o repositório:  

   ```bash
   git clone https://github.com/seu-usuario/sigere.git
   cd sigere

2. Requisitos para as Dependências do Projeto

    Antes de instalar e executar o SIGERE, certifique-se de que seu ambiente atende aos seguintes requisitos mínimos:

    - **Python**: Versão 3.10 ou superior  
    [Download e instruções](https://www.python.org/downloads/)

    - **Node.js**: Versão 14 ou superior (inclui npm)  
    [Download e instruções](https://nodejs.org/)


    - **Gerenciador de Dependências Python**: Poetry (recomendado) ou pip  

    - **Git:** Para controle de versão e clonagem do repositório
        
        [Download e instruções](https://git-scm.com/)
    
    Certifique-se de que todas as ferramentas estejam corretamente instaladas e configuradas no PATH do seu sistema para evitar problemas durante a instalação e execução do projeto.

3. Instale as dependências do backend:

    ```bash
    cd backend
    pip install -r requirements.txt

4. Configure o banco de dados SQLite conforme o arquivo .env.example e crie as migrations:

    ```bash 
    python manage.py migrate

5. Inicie o servidor backend:

    ```bash 
    python manage.py runserver

6. Crie outro terminal e instale as dependências do frontend:

    ```bash
    cd ../frontend
    npm install

7. Inicie o servidor frontend:

    ```bash 
     npm run dev

8. Inserir as credenciais: admin e Nat#22194.


## Funcionalidades 

    ✅ Página de Login

    ✅ Cadastro de Requisição

## Arquitetura / Organização do Projeto

    ```bash
    SIGERE/
    ├── .github/                   # Configurações de automação com GitHub Actions 
    │   └── workflows/             # Fluxos de trabalho de automação
    │       └── ci.yml             # Define a pipeline de integração contínua
    │
    ├── backend/                   # Diretório principal da aplicação Django (API)
    │   ├── requisicoes/           # App do Django para a gestão de requisições
    │   │   ├── migrations/        # Histórico de alterações do banco de dados
    │   │   ├── models.py          # Modelos de dados para requisições e materiais
    │   │   ├── serializers.py     # Lógica de serialização para a API REST
    │   │   └── views.py           # A lógica de negócio para os endpoints da API
    │   ├── venv/                  # Ambiente virtual Python
    │   ├── manage.py              # Utilitário de linha de comando do Django
    │   └── requirements.txt       # Dependências Python do projeto
    │
    ├── frontend/                  # Diretório principal da aplicação React (Vite)
    │   ├── public/                # Arquivos estáticos e o template HTML principal
    │   ├── src/                   # Código-fonte da aplicação
    │   │   ├── components/        # Componentes reutilizáveis da interface
    │   │   │   ├── Forms.jsx      # Componente do formulário de requisições
    │   │   │   └── Login.jsx      # Componente da tela de login
    │   │   ├── App.jsx            # Componente raiz da aplicação
    │   │   └── main.jsx           # Ponto de entrada do JavaScript
    │   └── package.json           # Dependências e scripts do Node.js
    │
    └── README.md                  # Documentação principal do projeto