# Testes Funcionais - Behavior Driven Development - Sprint #1



## User Storie  -> Cadastro de pipeline

__NOVO PIPELINE __ ✅ 
Eu, como usuário da aplicação __Target__
Quero cadastrar diferentes pipelines de vendas
Para gerenciar as negociações em andamento

Dado que acesso a página de Pipelines
Seleciono a opção "Novo pipeline"
Um modal é exibido com um campo para inserir o nome do Pipeline

__a)__ Dado que submeto as informações 
Uma mensagem de confirmação é exibida "Pipeline criado com sucesso!"

__b)__ Dado que submeto um nome já existente 
Uma mensagem de alerta é exibida "Pipeline já existente! Insira outro nome"

__c)__ Dado que submeto o formulário sem inserir dados
Uma mensagem de alerta é exibida "Dados inválidos!"

__d)__ Dado que clico no botão "X"
A operação é cancelada 

__EDITAR PIPELINE - Edição de pipeline__ ✅ 
Eu, como usuário da aplicação __Target__
Quero editar os pipelines de vendas
Para customizar a aplicação de acordo com minhas necessidades

Dado que acesso a página de Pipelines
Seleciono a opção "Editar pipeline"
Um modal é exibido com um campo para inserir o nome do Pipeline

__a)__ Dado que insiro dados e submeto o formulário
Uma mensagem de confirmação é exibida "Alteração salva!"

__b)__ Dado que não insiro dados e submeto o formulário
Uma mensagem de alerta é exibida "Dados inválidos!"

__DELETAR PIPELINE - Deleção de pipeline__ ✅ 
Eu, como usuário da aplicação __Target__
Quero deletar um pipeline de vendas
Para customizar a aplicação de acordo com minhas necessidades

Dado que acesso a página de Pipelines
Seleciono a opção "Deletar pipeline"
Um modal é exibido com uma mensagem de alerta "Tem certeza que deseja deletar esse pipeline? Todas as negociações do pipeline serão arquivadas" 

__a)__ Dado que confirmo a operação
Uma mensagem de confrimação é exibida "Pipeline deletado com sucesso! As negociações foram arquivadas"

__b)__ Dado que clico no botão "X"
A operação é cancelada e o modal é fechado

## User Storie -> Cadastro de negociações

__MOVER NEGOCIAÇÃO__ ✅ 
Eu, como usuário da aplicação __Target__
Quero mover uma negociação para um outro pipeline
Para registrar a evolução no fluxo da negociação

__a)__ Dado que arrasto o card até um determinado pipeline e solto
O card é movido para o novo pipeline

__b)__ Dado que arrasto o card para fora de um pipeline e solto
O card permanece no seu pipeline de origem



## User Storie  -> Login

__ACESSO DE USUÁRIO __ ✅ 
Eu, como usuário da aplicação __Target__
Quero acessar a aplicação por meio de email e senha
Para ter maior segurança ao utilizar a aplicação

Dado que acesso a página de login da aplicação
Os campos de "Email", "Senha" e um link "Esqueceu a senha?" são exibidos

__a)__ Dado que submeto o formulário de acesso com todos os campos preenchidos
A aplicação me direciona para a página de Pipelines

__b)__ Dado que submeto o formulário com dados incorretos
Uma mensagem de alerta é exibida "Email ou senha incorreta!"

__c)__ Dado que submeto o formulário sem preencher um ou mais campos
Uma mensagem de alerta é exibida "Preencha todos os campos!"

__RECUPERAÇÃO DE SENHA __ ✅ 
Eu, como usuário da aplicação __Target__
Quero rexuper a senha de acesso a aplicação por meio de email
Para ter maior segurança ao utilizar a aplicação

Dado que acesso a página de login da aplicação
Os campos de "Email", "Senha" e um link "Esqueceu a senha?" são exibidos
Dado que clico no link "Esqueci a senha" e sou direcionado para outra página

__a)__ Dado que insiro um email não cadastrado no campo e submeto
Uma mensagem de alerta é exibida "Não encontramos esse email em noossa base de dados

__b)__ Dado que insiro um email válido no campo e submeto
Uma mensagem de confirmação é exibida "Email enviado!"

 Dado que acesso a mensagem envida para meu email e clico no link "Clique aqui para ser redirecionado", sou direcionado para a página de redefinição de senha com dois campos, "Nova Senha" e "Confirmar senha"

__c)__ Dado que não preencho todos os campos com valores divergentes e submeto
Uma mensagem de alerta é exibida "Os valores devem ser correspondentes"

__d)__ Dado que preencho todos os campos com valores correspondentes e submeto
Uma mensagem de confirmação é exibida "Sua senha foi alterada com sucesso!"

