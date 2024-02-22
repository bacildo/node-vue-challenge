# Arquitetura do Projeto edtech-student-management

Introdução
O projeto edtech-student-management é uma aplicação web desenvolvida com Vue.js, Node.js, Express e MySQL, utilizando o Vuetify como framework de UI. O objetivo do projeto é gerenciar alunos em um ambiente educacional, permitindo a criação, edição e exclusão de registros de alunos.

Decisões de Arquitetura
Frontend (Vue.js)
O frontend da aplicação foi desenvolvido com Vue.js, seguindo os princípios de componentização e reatividade do framework. A arquitetura do frontend é baseada em componentes Vue.js, organizados de acordo com a funcionalidade e reutilização.

Estrutura de Pastas
src/
assets/: Contém arquivos estáticos como imagens e estilos.
components/: Componentes Vue.js reutilizáveis.
views/: Vistas da aplicação, que representam as diferentes páginas.
router/: Configuração do Vue Router para navegação.
store/: Configuração do Vuex para gerenciamento de estado global.
api/: Módulos para comunicação com o backend via Axios.
Backend (Node.js e Express)
O backend da aplicação foi desenvolvido com Node.js e Express, fornecendo endpoints RESTful para manipulação dos dados no banco de dados MySQL. A arquitetura do backend é baseada em controllers, services e models, seguindo o padrão MVC (Model-View-Controller).

Estrutura de Pastas
controllers/: Controllers para manipulação das requisições HTTP.
services/: Lógica de negócio da aplicação.
models/: Definição dos modelos de dados para interação com o banco de dados.
routes/: Definição das rotas da aplicação.
Banco de Dados (MySQL)
O banco de dados MySQL é utilizado para armazenar os dados dos alunos. A estrutura do banco de dados é simples, com uma tabela students contendo os campos id_student, name, register, cpf, e email.

Conclusão
A arquitetura do projeto edtech-student-management foi projetada para ser simples, modular e escalável. A separação clara entre frontend e backend, o uso de componentes reutilizáveis no frontend e a organização do backend seguindo o padrão MVC são aspectos importantes da arquitetura que facilitam o desenvolvimento e manutenção da aplicação.

# Lista de bibliotecas

# Dependencies
axios: ^1.6.7
core-js: ^3.8.3
cors: ^2.8.5
express: ^4.18.2
mysql2: ^3.9.1
register-service-worker: ^1.7.2
vue: ^2.6.14
vue-router: ^3.5.1
vuetify: ^2.6.0
vuex: ^3.6.2

# DevDependencies
@babel/core: ^7.12.16
@babel/eslint-parser: ^7.12.16
@vue/cli-plugin-babel: ~5.0.0
@vue/cli-plugin-eslint: ~5.0.0
@vue/cli-plugin-pwa: ~5.0.0
@vue/cli-plugin-router: ~5.0.0
@vue/cli-plugin-unit-jest: ~5.0.0
@vue/cli-plugin-vuex: ~5.0.0
@vue/cli-service: ~5.0.0
@vue/test-utils: ^1.1.3
@vue/vue2-jest: ^27.0.0-alpha.2
babel-jest: ^27.0.6
concurrently: ^8.2.2
eslint: ^7.32.0
eslint-plugin-vue: ^8.0.3
jest: ^27.0.5
sass: ^1.32.7
sass-loader: ^12.0.0
vue-cli-plugin-vuetify: ~2.5.8
vue-template-compiler: ^2.6.14
vuetify-loader: ^1.7.0

# O que melhoraria com mais tempo.

- O layout da aplicação
- Os testes em todas as camadas, tive um problema com o jest e js puro, apesar de não ter um teste válido, cheguei a escrever um.
- Utilizaria Typescript.
- Teria realizado as autenticações e proteção da rota.
- Acredito que um trabalho melhor, mas o desafio até aqui foi intenso, válido e interessante. Grato pela oportunidade!

# Observações sobre como rodar a aplicação.

### Runs only backend

npm run backend

### Runs only frontend

npm run frontend

### Runs entire application

npm run application

# Sobre a base de dados

- Dentro de backend/configs existe um arquivo init.sql com a query para criar o mesmo banco sql que aqui foi utilizado.
