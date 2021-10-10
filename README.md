# <img src="https://github.com/vinicius-hso/api-sem3-target-crm/blob/development/target/public/favicon.svg" width="30"/> TARGET CRM
Aplicação de gerenciamento de relações com clientes

Nesta branch estão dispostos todos os códigos em ambiente de desenvolvimento da Aplicação TARGET utilizando TypeScript, Node.js, e React.

A aquitetura da aplicação é explicada pela seguite imagem:
<p align="center">
 <img src="https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-1/Documentation/arquitetura-da-aplicação.jpeg"/></p>

## AMBIENTE DE DESENVOLVIMENTO:

### Requerimentos do Sistema
- [Node.js](https://nodejs.org/en/download/)
- [docker](https://www.docker.com) e [docker-compose](https://docs.docker.com/compose)
- [yarn](https://yarnpkg.com/en)

### Inicializando o projeto - BACKEND:

Na pasta "backend" via terminal:
  - rode `yarn` para instalar dependências
  - crie um aquivo na raiz do projeto chamado `.env` copie os valores do `.env.exemple` para ele;
  - rode `docker-compose up -d`;
  - rode `yarn typeorm migration:run`;
  - rode `yarn dev`;
  - acesse `http://localhost:3333`;

<p align="center">
 <img src="https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-1/Images/localhost_3333.png"/></p>

### Inicializando o projeto - FRONTEND:

Na pasta "target" via terminal:
  - rode `yarn` para instalar dependências
  - rode `yarn dev`;
  - acesse `http://localhost:3000`;
  
<p align="center">
 <img src="https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-1/Images/localhost_3000.png"/></p>

## ESTRUTURA DO PROJETO

Para a organização do projeto foram utilizadas [Referência de Projeto em Typescript](https://www.typescriptlang.org/docs/handbook/project-references.html)

Para acessibilidade e experiência do usuário utilizamos como referência o manual [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

<p align="center">
 <img src="https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-2/Images/Estrutura_development.png"/></p>
 

## TECNOLOGIAS UTILIZADAS
- [TypeScript](http://www.typescriptlang.org/)
- Backend
    - [Node.js](https://nodejs.org)
    - [Express](https://expressjs.com/)
       - [PostgreSQL](https://www.postgresql.org/) como SGBD
        - [TypeORM](http://typeorm.io) para código primário e migrações do Banco de dados
- Frontend
    - [React](https://reactjs.org/)
    - [UI Biblioteca](https://material-ui.com/pt/) para estilização dos componentes
    - [NextJS](https://nextjs.org) para sistema de rotas
- Developer environment
    - [docker](https://www.docker.com/) e [docker-compose](https://docs.docker.com/compose)
    - VSCode
- Testing
    - Testes funcionais da aplicação e apropriada documentação

## CONTRIBUIÇÃO

- "Features", "issues reports" e "bug fixes" são bem vindos!
