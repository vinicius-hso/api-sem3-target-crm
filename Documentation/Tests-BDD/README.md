# Testes Funcionais - Behavior Driven Development - Sprint #3

## User Stories  -> Importação de Contatos e Envio de Emails


__IMPORTAR CONTATOS__ ✅ 

Eu, como usuário da aplicação __Target__,
Gostaria de importar contatos 
Para a aplicação de uma base de dados em XLS

Dado que acesso a página de Contatos
Seleciono a opção "Importar"
Um modal é exibido com um campo para selecionar o arquivo XLS

__a)__ Dado que envio determinado arquivo XLS com as informações completas de contatos (nome e email)
As informações contidas no arquivo são apresentadas no modal e um novo campo é mostrado para selecionar a empresa vinculada ao contato

__b)__ Dado que seleciono a empresa vinculada ao contato e clico no botão confirmar
Uma mensagem de sucesso é apresentada no canto superior direito e os novos contatos são apresentados na lista

__c)__ Dado que envio determinado arquivo XLS com as informações completas de contatos (nome e email), porém não seleciono a empresa vinculada ao contato
Uma mensagem de alerta é apresentada indicando o erro, e questionando se o usuário deseja tentar novamente

__d)__ Dado que envio determinado arquivo XLS com as informações incompletas (nome e email) e seleciono o botão "Confirmar"
Uma mensagem de alerta é apresentada indicando o erro, e questionando se o usuário deseja tentar novamente


__ENVIO DE EMAILS__ ✅ 

Eu, como usuário da aplicação __Target__,
Gostaria de enviar mensagens de emails de forma automática e personalizável
Para ter um melhor gerenciamento dos contatos

Dado que acesso a página de Contatos
Seleciono a opção "Importar"
Um modal é exibido com um campo para selecionar o arquivo XLS

__a)__ Dado que envio o arquivo corretamente, com as informações corretas e completas
Um email personalizável é enviado aos contatos cadastrados de forma automática e instantânea indicando o sucesso no cadastro

__b)__ Dado que envio o arquivo corretamente, com as informações corretas dos contatos, entretanto incompletas (sem email)
Os contatos são criados e apresentados na lista, porém o email personalizável não é enviado

__c)__ Dado que envio o arquivo com as informações incorretas e incompletas (nome e email)
Os contatos com informações incompletas (nome e/ou email) não são criados e o email personalizável não é enviado

# Testes Funcionais - Behavior Driven Development - Sprint #3

## User Storie  -> Dashboard 

__GRÁFICO NEGOCIAÇÕES x PERÍODO__ ✅ 

Eu, como usuário da aplicação __Target__,
Quero visualizar em um gráfico as minhas negociações ganhas e perdidas ao longo do tempo
Para entender a evolução das minhas negociações em períodos analisados

Dado que acesso a página Dashboard
Desço até o gráfico "Negociações por Períodos"
Um gráfico de linha é exibido

__a)__Dado que declaro uma negociação como ganha na página de Negociações, o valor em reais dela aparece no gráfico no dia presente como ganha

__b)__Dado que declaro uma negociação como perdida na página de Negociações, o valor em reais dela aparece no gráfico no dia presente como perdida

__c)__Dado que incluo zoom na tela em um determinado período
O período de interesse é apresentado no gráfico

__d)__Dado que clico em "Download SVG", "Download PNG" ou "Download CSV"
Faço o download de uma imagem em formato PNG, imagem em formato PNG ou planilha em formato csv, respectivamente, contendo os dados apresentados nos gráficos



__GRÁFICO TOTAL NEGOCIAÇÕES__ ✅ 

Eu, como usuário da aplicação __Target__,
Quero visualizar em um gráfico todas as minhas negociações ganhas, perdidas e em andamento
Para avaliar e comparar a porcentagem de cada um desses status em todo meu negócio

Dado que acesso a página Dashboard
Desço até o gráfico "Geral"
Um gráfico em pizza é exibido

__a)__ Dado que crio uma negociação "em andamento" na página de Negociações, o valor do label "Andamento" aumenta em uma unidade

__b)__ Dado que declaro uma negociação "em andamento" como "ganha" na página de Negociações, o valor do label "Andamento" diminui em uma unidade enquanto o valor do label "Ganhou" aumenta em uma unidade no gráfico

__c)__ Dado que declaro uma negociação "em andamento" como "perdida" na página de Negociações, o valor do label "Andamento" diminui em uma unidade enquanto o valor do label "Perdeu" aumenta em uma unidade no gráfico

__d)__ Dado que declaro uma negociação "em andamento" como "arquivada" na página de Negociações, o valor do label "Andamento" diminui em uma unidade enquanto o valor do label "Arquivada" aumenta em uma unidade no gráfico

__e)__ Dado que clico em "Download SVG", "Download PNG" ou "Download CSV"
Faço o download de uma imagem em formato PNG, imagem em formato PNG ou planilha em formato csv, respectivamente, contendo os dados apresentados nos gráficos

__GRÁFICO NEGOCIAÇÕES x EMPRESA__ ✅ 

Eu, como usuário da aplicação __Target__,
Quero visualizar em um gráfico as minhas negociações ganhas, perdidas e em andamento por empresas
Para avaliar e comparar a relevância de cada empresa para meu negócio


Dado que acesso a página Dashboard
Desço até o gráfico personalizável e seleciono a opção "Empresas" (default)
Um gráfico em barras é exibido, no eixo x estão presentes cada uma das empresas cadastradas (que possuem negociações associadas), enquanto no eixo y poderá ser apresentado tanto a quantidade de negociações (default) quanto o valor da soma em reais das negociações daquela empresa

__a)__ Dado que crio uma negociação "em andamento" de uma empresa específica na página de Negociações, o valor do label "EM ANDAMENTO" aumenta em uma unidade para essa mesma empresa no gráfico

__b)__ Dado que declaro uma negociação "em andamento" como "ganha"  de uma empresa específica na página de Negociações, o valor do label "EM ANDAMENTO" diminui em uma unidade, enquanto o valor do label "GANHA" aumenta em uma unidade para essa mesma empresa no gráfico

__c)__ Dado que declaro uma negociação "em andamento" como "perdida" de uma empresa específica na página de Negociações, o valor do label "EM ANDAMENTO" diminui em uma unidade, enquanto o valor do label "PERDIDA" aumenta em uma unidade para essa mesma empresa no gráfico

__d)__ Dado que declaro uma negociação "em andamento" como "arquivada"  de uma empresa específica na página de Negociações, o valor do label "EM ANDAMENTO" diminui em uma unidade no gráfico

__e)__ Dado que clico no botão "VALOR", os mesmos comportamentos apresentados nos itens de "a)" a "d)" devem ser verificados para a soma dos valores apresentados por uma empresa específica, em reais

__f)__ Dado que clico em "Download SVG", "Download PNG" ou "Download CSV"
Faço o download de uma imagem em formato PNG, imagem em formato PNG ou planilha em formato csv, respectivamente, contendo os dados apresentados nos gráficos

__GRÁFICO NEGOCIAÇÕES x VENDEDORES__ ✅ 

Eu, como usuário da aplicação __Target__,
Quero visualizar em um gráfico as minhas negociações ganhas, perdidas e em andamento por vendedores
Para avaliar e comparar o desempenho e contribuição dos vendedores para o negócio

Dado que acesso a página Dashboard
Desço até o gráfico personalizável e seleciono a opção "Vendedores" 
Um gráfico em barras é exibido, no eixo x estão presentes cada um dos vendedores cadastrados (que possuem negociações associadas), enquanto no eixo y poderá ser apresentado tanto a quantidade de negociações (default) quanto o valor da soma em reais das negociações daquele vendedor.

__a)__ Dado que crio uma nova negociação "em andamento" logado com o perfil de um vendedor específico  na página de negociações, o valor do label "EM ANDAMENTO" aumenta em uma unidade, no gráfico, para esse vendedor

__b)__ Dado que altero a negociação "em andamento" criada no item "a)" para "ganha" na página de negociações, o valor do label "EM ANDAMENTO" diminui em uma unidade, enquanto o valor do label "GANHA" aumenta em uma unidade, no gráfico, para o vendedor específico

__c)__ Dado que altero a negociação "em andamento" criada no item "a)" para "perdida" na página de negociações, o valor do label "EM ANDAMENTO" diminui em uma unidade, enquanto o valor do label "PERDIDA" aumenta em uma unidade, no gráfico, para o vendedor específico

__d)__ Dado que altero a negociação "em andamento" criada no item "a)" para "arquivada" na página de negociações, o valor do label "EM ANDAMENTO" diminui em uma unidade, no gráfico, para o vendedor específico

__e)__ Dado que clico no botão "VALOR", os mesmos comportamentos apresentados nos itens de "a)" a "d)" devem ser verificados para a soma dos valores apresentados por um vendedor específico, em reais

__f)__ Dado que clico em "Download SVG", "Download PNG" ou "Download CSV"
Faço o download de uma imagem em formato PNG, imagem em formato PNG ou planilha em formato csv, respectivamente, contendo os dados apresentados nos gráficos


__CARD VALOR MÉDIO DAS NEGOCIAÇÕES__ ✅ 

Eu, como usuário da aplicação __Target__,
Quero visualizar em um Card o valor médio das minhas negociações bem como o valor total de todas as negociações cadastradas e a quantidade total de negociações
Para saber qual o valor médio de uma negociação devo considerar nas avaliações de meu negócio


Dado que acesso a página Dashboard
No topo da página visualizo os cards, referente ao card do lado esquerdo
É exibido um card com as informações do valor médio, total e quantidade de negociações

__a)__ Dado que crio uma negociação com valor X na página de negociações, esse valor X é acrescido no valor total de negociações , a quantidade de negociações aumenta em uma unidade e o valor médio da negociação é alterado proporcionalmente


__CARD TAXA DE CONVERSÃO__ ✅ 

Eu, como usuário da aplicação __Target__,
Quero visualizar em um Card a taxa de conversão
Para saber em média quantas das negociações cadastradas efetivam em lucro para o negócio

Dado que acesso a página Dashboard
No topo da página visualizo os cards, referente ao card do lado direito
É exibido um card com as informações de taxa de conversão, quantidade de negociações ganhas, perdidas, em andamento e arquivadas

__a)__ Dado que crio uma negociação na página de negociações, o valor de negociações "EM ADAMENTO" no card aumenta em uma unidade, e a taxa de conversão diminui proporcionalmente

__b)__ Dado que altero a negociação "em andamento" criada no item "a)" para "ganho" na página de negociações, o valor apresentado no card "EM ANDAMENTO" diminui em uma unidade, enquanto o valor do label "GANHAS" aumenta em uma unidade, e a taxa de conversão aumenta proporcionalmente




