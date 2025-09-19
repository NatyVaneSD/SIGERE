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
├── .github/                       # Configurações do GitHub para automação (ex: CI/CD)
│   └── workflows/                 # Define fluxos de trabalho
│       └── ci.yml                 # Arquivo de fluxo de trabalho para integração contínua
├── backend/                       # Diretório principal da sua aplicação Django
│   ├── admin/                     # Módulo de administração do Django
│   ├── auth/                      # Módulo de autenticação
│   ├── backend_config/            # Configurações do projeto Django
│   ├── contenttypes/              # Módulo do Django para tipos de conteúdo
│   ├── requisicoes/               # Sua aplicação Django para o sistema de requisições
│   │   ├── __pycache__/           # Cache de bytecode Python
│   │   ├── migrations/            # Migrações do banco de dados para o modelo 'requisicoes'
│   │   ├── __init__.py            # Torna o diretório um pacote Python
│   │   ├── admin.py               # Registra modelos no painel de administração
│   │   ├── apps.py                # Configura a aplicação 'requisicoes'
│   │   ├── models.py              # Define os modelos de dados (tabelas do banco)
│   │   ├── serializers.py         # Converte dados do modelo para JSON
│   │   ├── tests.py               # Arquivos para testes unitários
│   │   ├── urls.py                # Define as rotas (URLs) da API
│   │   └── views.py               # Lógica de negócio da API
│   ├── sessions/                  # Módulo de sessões
│   ├── venv/                      # Ambiente virtual Python para isolar dependências
│   ├── db.sqlite3                 # Banco de dados padrão de desenvolvimento
│   ├── manage.py                  # Utilitário de linha de comando do Django
│   └── requirements.txt           # Lista de dependências Python do projeto
├── frontend/                      # Diretório principal da sua aplicação React (Vite)
│   ├── node_modules/              # Onde as dependências npm são instaladas
│   ├── public/                    # Arquivos estáticos que não são processados (ex: index.html)
│   ├── src/                       # Código-fonte da aplicação React
│   │   ├── assets/                # Para ativos como imagens e fontes
│   │   ├── components/            # Componentes React reutilizáveis
│   │   │   ├── Forms.jsx          # Componente do formulário principal
│   │   │   ├── Login.css          # Estilos CSS específicos para o login
│   │   │   ├── Login.jsx          # Componente da página de login
│   │   │   ├── MaterialForm.jsx   # Componente para a parte do formulário de materiais
│   │   │   └── OffcanvasNavbar.jsx # Componente para a barra de navegação
│   │   ├── img/                   # Pasta para imagens
│   │   ├── App.css                # Estilos CSS globais da aplicação
│   │   ├── App.jsx                # Componente raiz da aplicação React
│   │   ├── index.css              # Estilos CSS globais, geralmente para o corpo da página
│   │   └── main.jsx               # Ponto de entrada da aplicação
│   ├── .gitignore                 # Arquivos e pastas a serem ignorados pelo Git
│   ├── eslint.config.js           # Configuração do ESLint para JavaScript
│   ├── index.html                 # A página HTML inicial da aplicação
│   ├── package-lock.json          # Garante versões de dependências consistentes
│   ├── package.json               # Lista as dependências e scripts do Node.js
│   ├── postcss.config.js          # Configuração do PostCSS (ferramenta de transformação de CSS)
│   ├── tailwind.config.js         # Configuração do Tailwind CSS
│   └── vite.config.js             # Configuração do bundler Vite
└── .pylintrc                      # Configuração do linter PyLint para código Python
└── README.md                      # Documentação do projeto