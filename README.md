## Guia para rodar o backend.

<br/>

## Necessário:

- Node
- Yarn ou NPM
- Banco de dados ( Escolha uma opção das 3, no caso docker ele já vai criar o DB e o usuário, caso do postgres, crie o próprio DB e usuário )
  - Docker/Docker-compose( linux );
  - Docker Desktop ( Win/Mac );
  - PostgreSQL;

<br/>

## Seguindo caminho do docker

- Se for desenvolver apenas no frontend:

  - crie um aquivo na raiz do projeto chamado `.env` copie os valores do `.env.exemple` para ele;
  - rode `docker-compose up -d`;
  - acesse `localhost:3333`;

  <br/>

- Se for desenvolver algo no backend:
  - <sub> Caso não use o docker, substitua o passo dele por criar o DB e usuário no psql: <sub>
  - acesse a pasta do backend via terminal;
  - rode `yarn` ou `npm install`;
  - crie um aquivo na raiz do projeto chamado `.env` copie os valores do `.env.exemple` para ele;
  - comente todo o código a partir da linha 15 no `docker-compose.yml`
  - rode `docker-compose up -d`;
  - rode `yarn typeorm migration:run`;
  - rode `yarn dev` ou `npm run dev`;
  - acesse `localhost:3333`;
    - SE NECESSÁRIO, PARA REVERTER AS MIGRATIONS, rode `yarn typeorm migration:revert`;
    - SE NECESSÁRIO, PARA DROPAR O DB, rode `yarn typeorm schema:drop` e depois `yarn typeorm migration:run`;

**liberando acesso para envio de email (EMAIL: GSWatcher): 'https://accounts.google.com/DisplayUnlockCaptcha'**
