# SuperSign

# Sumário

- [Arquitetura e Decisões Técnicas](#Arquitetura-e-Decisões-Técnicas)
  - [Visão Geral](#Visão-Geral)
  - [Decisões Técnicas](#Decisões-Técnicas)
- [Como testar o projeto?](#como-testar-o-projeto)
- [Rodar local](#rodal-local)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)

# Arquitetura e Decisões Técnicas

## Visão Geral

Este projeto é um protótipo de plataforma de assinatura digital de documentos desenvolvido como parte de um teste técnico para a SuperSign. Ele foi construído com as seguintes tecnologias:

- **Next.js 14** com App Router para uma abordagem moderna de rotas e gerenciamento de estado.
- **TypeScript** para tipagem estática e maior segurança no desenvolvimento.
- **Prisma ORM** para modelagem e manipulação de dados no banco de dados com facilidade e segurança.
- **Next Auth 4** para autenticação segura com suporte a login por e-mail e Google OAuth.
- **Shadcn-UI** para componentes estilizados e modernos usando TailwindCSS.
- **Node.js** como ambiente de execução.

## Decisões Técnicas

**1. App Router no Next.js 14**: A escolha pelo App Router foi feita para aproveitar a nova abordagem de roteamento que simplifica a estrutura de páginas e rotas dinâmicas, além de fornecer suporte nativo a layouts aninhados e gerenciamento de estado otimizado.

**2. Prisma ORM**: Utilizado pela facilidade de integração com o Next.js e pela abordagem declarativa de modelagem de dados. As migrations versionadas garantem um controle rigoroso sobre as alterações no banco de dados, enquanto o Prisma Client oferece uma interface intuitiva e tipada para manipulação dos dados.

**3. Next Auth 4**: Escolhido por fornecer uma solução completa e segura de autenticação, com suporte a provedores de terceiros e credenciais personalizadas. Isso atende à necessidade de um login seguro e flexível.

**4. Shadcn-UI e TailwindCSS**: A combinação de Shadcn-UI e TailwindCSS permite construir uma interface moderna, responsiva e estilizada rapidamente, com componentes prontos para uso e altamente customizáveis.

**5. Arquitetura de Pastas**
   O projeto foi estruturado seguindo boas práticas para facilitar a manutenção e escalabilidade:

- `app/` - Componentes e páginas usando o App Router
- `components/` - Componentes reutilizáveis
- `lib/` - Configurações e funções utilitárias
- `prisma/` - Definição do schema e migrations
- `types/` - Extensão de tipagens

6. **Segurança e Boas Práticas**

- Senhas são armazenadas de forma segura usando hashing (bcrypt).
- Tokens de sessão protegidos e expiram automaticamente.
- Dados sensíveis não são expostos no frontend.

Essas escolhas proporcionam uma base sólida, flexível e escalável, atendendo aos requisitos funcionais e não funcionais do projeto.

# Desafios Enfrentados e Soluções Adotadas

**1. Gestão de Sessões e Segurança de Autenticação**

- **Desafio:** Garantir um fluxo de autenticação seguro e eficiente, lidando com tokens de sessão e credenciais sensíveis.

- **Solução:** Utilização de callbacks personalizados no Next Auth para controlar a duração das sessões e implementar medidas de segurança adicionais, como o armazenamento seguro de tokens e proteção contra ataques de sessão.

**2. Upload de Arquivos e Segurança**

- **Desafio:** Garantir upload seguro e eficiente de documentos, evitando acessos não autorizados.

- **Solução:** A integração foi feita utilizando o App Router com controles de permissões baseados no usuário autenticado e validação no backend.

**3. Manutenção de Estado e Navegação Dinâmica**

- **Desafio:** Gerenciar estados complexos e navegação dinâmica com o App Router.

- **Solução:** Utilização de Context API e hooks personalizados para controle de fluxo e estados globais.

# Funcionalidades

**1. Autenticação**
- Página de login/registro
- Proteção de rotas privadas
- Logout
- Gerenciamento básico de sessão

**2. Gerenciamento de Documentos**
- Listagem de documentos do usuário logado
- Upload de novos documentos (PDF)
- Visualização de documento
- Exclusão de documentos

**3. Assinatura Digital (Simplificada)**
- Interface para simular assinatura em documento
- Registro da assinatura com timestamp
- Status do documento (Pendente, Assinado)

# Como testar o projeto?

## Pré-requisitos

Antes de rodar o projeto, você precisa ter o seguinte instalado:

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

Para começar, clone o repositório:

```bash
git clone git@github.com:LuisFelipeMod/supersign-prototype.git
cd supersign-prototype
```

Instale as dependências:

```bash
# npm:
npm install
# yarn:
yarn install
# pnpm:
pnpm install
```

Gere o banco de dados:

```bash
  npx prisma generate
```

Sincronize o banco de dados com o schema:

```bash
  npx prisma db push
  # ou
  npx prisma migrate dev

```

Agora, para rodar o projeto localmente:

```bash
# npm:
npm run dev
# yarn:
yarn dev
# pnpm:
pnpm run dev
```

O site estará disponível em http://localhost:3000.
