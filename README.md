# TechPoint - Loja de Eletrônicos
TechPoint é um aplicativo de loja de eletrônicos desenvolvido em React Native. Ele permite que os usuários naveguem por produtos, realizem pedidos, editem o perfil e acompanhem o status de seus pedidos de forma prática e interativa.

Funcionalidades
Cadastro e Login: Criação e autenticação de conta.
Simulação de Pedidos: Simulação e confirmação de pedidos diretamente no app.
Gestão de Perfil: Edição de informações pessoais e imagem de perfil.
Navegação Intuitiva: Interface fluida com o uso de React Navigation.
Persistência de Dados: Utilização de AsyncStorage para armazenamento local das informações do usuário.
Tecnologias Utilizadas
React Native: Desenvolvimento da interface de usuário.
React Navigation: Navegação entre telas.
Hooks (useState, useEffect, useCallback): Gerenciamento de estado e ciclo de vida dos componentes.
AsyncStorage: Armazenamento de dados local no dispositivo.
Axios: Comunicação com o backend local para operações de CRUD.
Estrutura do Projeto
Tela de Login e Cadastro:

Construída com componentes nativos.
Navegação para tela inicial após autenticação bem-sucedida.
Tela Home:

Exibição de produtos e perfil do usuário.
Integração com AsyncStorage para dados persistentes.
Tela de Detalhes dos Produtos:

Navegação para pedido e feedback em tempo real ao usuário.
Envio de dados para o backend usando axios.
Tela de Pedidos Realizados:

Gerenciamento e exclusão de pedidos.
Comunicação com backend para confirmação e exclusão de dados.
Tela de Perfil:

Edição e armazenamento das informações do usuário.
Feedback ao usuário sobre o sucesso ou falha das operações.
