# Testes Funcionais - Behavior Driven Development - Sprint #2



## User Storie  -> Cadastro de Contato 

__NOVO CONTATO__ ✅ 
Eu, como usuário da aplicação __Target__
Quero cadastrar diferentes contatos
Para associá-los as negociações em andamento

Dado que acesso a página de Contatos
Seleciono a opção "Adicionar"
Um modal é exibido com os campos para inserir as informações do contato

__a)__ Dado que submeto as informações corretamente
Um novo contato é adicionado e exibido na página

__b)__ Dado que tento submeto sem preencher o campo "Nome"
     A ação não é efetivada.

__c)__ Dado que tento submeter as informações sem "Selecionar nome da empresa"
     A ação não é efetivada.

__VISUALIZAR CONTATO__ ✅ 
Eu, como usuário da aplicação __Target__
Quero visualizar as contatos cadastrados
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Contato
Uma lista de cartões com as informações do contatos é exibida.

__a)__ Dado que clico em um cartão de contato
Um modal é exibido apresentando as informações contato.

__DELETAR CONTATO__ ✅ 
Eu, como usuário da aplicação __Target__
Quero deletar um contato cadastrado
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Contato
Clico no cartão do contato 
Um modal é exibido com um botão "Deletar"

__a)__ Dado que clico no botão "Deletar"
O contato é deletado e não é mais apresentada na página -Resolvido

__EDITAR CONTATO__ ✅ 
Eu, como usuário da aplicação __Target__
Quero editar um contato já cadastrado
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Contatos
Clico no cartão de Contatos 
Um modal  "Editar Contato" é exibido na tela
Clico no botão "Salvar" e é feita a alteração - Resolvido

__a)__ Dado que altero os dados do contato e clico em "Salvar"
Os dados do contato são alterados e o contaro é apresentado na página.

__b)__ Dado que não altero os dados do contato e clico em "Salvar"
Os dados do contato permanecem inalterados e contato é apresentada na página

## User Storie  -> Cadastro de Usuários 

__NOVO USUÁRIO__ ✅ 

Eu como administrador da aplicação __Target__
Quero cadastrar, remover e editar diferentes usuários 
Para realizar o gerenciamento de usuários (administradores e vendedores)

Dado que acesso a página de Usuários
Seleciono a opção "Novo usuário"
Um modal é exibido com um campo para inserir as informações do usuário

__a)__ Dado que submeto as informações corretamente
Um novo usuário é adicionado e exibido na página

__b)__ Dado que submeto as informações sem preencher o campo "Nome"
Uma mensagem de alerta é exibida "Nome é obrigatório"

__c)__ Dado que submeto as informações sem preencher o campo "Email"
Uma mensagem de alerta é exibida "Email é obrigatório"

__VISUALIZAR USUÁRIO__ ✅ 
Eu, como administrador da aplicação __Target__
Quero visualizar os usuários cadastradas
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Usuários
Uma lista de cartões com as informações dos usuários é exibida

__a)__ Dado que clico em um cartão de usuário
Um modal é exibido apresentando as informações do usuário

__DELETAR USUÁRIO__ ✅ 
Eu, como administrador da aplicação __Target__
Quero deletar um usuário cadastrado
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Usuários
Clico no cartão de usuário
Um modal é exibido com um botão "Deletar"

__a)__ Dado que clico no botão "Deletar"
O usuário é deletado e não é mais apresentado na página

__EDITAR USUÁRIO__ ✅ 
Eu, como administrador da aplicação __Target__
Quero editar um usuário cadastrado
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Usuários
Clico no cartão de usuário
Um modal é exibido com um botão "Editar"
Clico no botão "Editar"

__BUSCA FILTRADA__ ✅ 
Eu, como administrador da aplicação __Target__
Quero buscar um usuário pelo nome ou role
Para ter maior agilidade para encontrar um usuário específico

Dado que acesso a página de Usuários
Seleciono o filtro "Nome" na barra de pesquisa

__a)__ Dado que digito o nome do usuário que procuro precisamente
Após 2 segundos são apresentados os usuários que possuem o nome informado.

__b)__ Dado que digito apenas o primeiro ou qualquer outro caractere presente no nome do usuário que procuro
Após 1 segundo são apresentados os usuários que possuem o caractere informado.

__c)__ Dado que digito alguns caracteres presentes no nome do usuário que procuro
Após 1 segundo são apresentados os usuários que possuem os caracteres informados.

__d)__ Dado que digito um ou mais caracteres que não estão presentes em nenhum nome de usuário
Após 1 segundo nenhum usuário é apresentado.

__e)__ Dado que digito um ou mais caracteres que estão presentes mais um ou mais caracteres que não estão presentes em nenhum nome de usuário
Após 1 segundo nenhum usuário é apresentado.

## User Storie  -> Cadastro de empresa 

__NOVA EMPRESA__ ✅ 
Eu, como usuário da aplicação __Target__
Quero cadastrar diferentes empresas
Para associá-las as negociações em andamento

Dado que acesso a página de Empresas
Seleciono a opção "Novo empresa"
Um modal é exibido com um campo para inserir as informações da empresa

__a)__ Dado que submeto as informações corretamente
Uma nova empresa é adicionada e exibida na página

__b)__ Dado que submeto as informações sem preencher o campo "Nome"
Uma mensagem de alerta é exibida "Informe o nome da empresa"

__VISUALIZAR EMPRESA__ ✅ 
Eu, como usuário da aplicação __Target__
Quero visualizar as empresas cadastradas
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Empresas
Uma lista de cartões com as informações das empresas é exibida

__a)__ Dado que clico em um cartão de empresa
Um modal é exibido apresentando as informações da empresa

![](https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-2/Documentation/Tests-BDD/gifs/create-company.gif)

__EDITAR EMPRESA__ ✅ 
Eu, como usuário da aplicação __Target__
Quero editar uma empresa cadastrada
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Empresas
Clico no cartão da empresa 
Um modal é exibido com um botão "Editar"
Clico no botão "Editar"

__a)__ Dado que altero os dados da empresa e clico em "Salvar"
Os dados da empresa são alterados e a empresa é apresentada na página.

__b)__ Dado que não altero os dados da empresa e clico em "Salvar"
Os dados da empresa permanecem inalterados e a empresa é apresentada na página

__c)__ Dado que altero os dados da empresa e clico em "Cancelar"
Os dados da empresa permanecem inalterados e a empresa é apresentada na página.

__d)__ Dado que não altero os dados da empresa e clico em "Cancelar"
Os dados da empresa permanecem inalterados e a empresa é apresentada na página.

![](https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-2/Documentation/Tests-BDD/gifs/update-company.gif)

__DELETAR EMPRESA __ ✅ 
Eu, como usuário da aplicação __Target__
Quero deletar uma empresa cadastrada
Para ter um melhor gerenciamento da aplicação

Dado que acesso a página de Empresas
Clico no cartão da empresa 
Um modal é exibido com um botão "Deletar"

__a)__ Dado que clico no botão "Deletar"
A empresa é deletada e não é mais apresentada na página

![](https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-2/Documentation/Tests-BDD/gifs/delete-company.gif)

__BUSCA FILTRADA__ ✅ 
Eu, como usuário da aplicação __Target__
Quero buscar uma empresa pelo nome ou cidade
Para ter um maior agilidade para encontrar uma empresa específica

Dado que acesso a página de Empresas
Seleciono o filtro "Nome" na barra de pesquisa

__a)__ Dado que digito o nome da empresa que procuro precisamente
Após 3 segundos são apresentadas as empresas que possuem o nome informado.

__b)__ Dado que digito apenas o primeiro ou qualquer outro caractere presente no nome da empresa que procuro
Após 1 segundo são apresentadas as empresas que possuem o caractere informado.

__c)__ Dado que digito alguns caracteres presentes no nome da empresa que procuro
Após 1 segundo são apresentadas as empresas que possuem os caracteres informados.

__d)__ Dado que digito um ou mais caracteres que não estão presentes em nenhum nome de empresa
Após 1 segundo nenhuma empresa é apresentada.

__e)__ Dado que digito um ou mais caracteres que estão presentes mais um ou mais caracteres que não estão presentes em nenhum nome de empresa
Após 1 segundo nenhuma empresa é apresentada.

![](https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-2/Documentation/Tests-BDD/gifs/delete-company.gif)

## User Storie  -> Perfil do Usuário

__NOVO USUÁRIO__ ✅ 

Eu como usuário da aplicação __Target__
Quero visualizar e alterar meus dados pessoais
Para customizar minhas informações quando necessário

Dado que acesso a página de Minha Conta
Seleciono a opção "Editar" em Meus dados
Os campos de informações são habilitados para a edição

__a)__ Dado que submeto as informações sem preencher o campo nome ou o campo email
Uma mensagem de alerta é exibida "Informe o nome!" ou "Informe o email!"

__b)__ Dado que altero as informações dos campos e clico em "Salvar"
Uma mensagem de sucesso é apresentada "Usuário editado com sucesso"

![](https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-2/Documentation/Tests-BDD/gifs/update-info-profile.gif)

Dado que acesso a página de Minha Conta
Clico no botão "Alterar senha"
Os campos de informações são exibidos para a edição

__a)__ Dado que informo minha senha atual incorretamente
Uma mensagem de alerta é exibida "Ops! Algo deu errado, verifique sua conexão e tente novamente"

__b)__ Dado que informo minha senha atual corretamente e informo Nova senha e Confirmar nova senha divergentes
Uma mensagem de alerta é exibida "Ops! Algo deu errado, verifique sua conexão e tente novamente"

__c)__ Dado que informo minha Senha atual, Nova senha e Confirmar nova senha corretamente
Uma mensagem de sucesso é exibida "Senha editada com sucesso!"

![](https://github.com/vinicius-hso/api-sem3-target-crm/blob/Sprint-2/Documentation/Tests-BDD/gifs/update-password.gif)
