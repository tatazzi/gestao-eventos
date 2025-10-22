# Sistema de Gestão de Eventos

##  Como Rodar o Projeto

###  Instalar Dependências

```bash
npm install
```

###  Iniciar o Projeto

**Opção 1: Iniciar tudo junto**

```bash
npm run dev:all
```

Isso iniciará:
- Servidor de autenticação na porta 3001
- Aplicação Next.js na porta 3000

**Opção 2: Iniciar separadamente**

Terminal 1:
```bash
npm run server
```

Terminal 2:
```bash
npm run dev
```

### Acessar o Sistema

- **Aplicação:** http://localhost:3000
- **API:** http://localhost:3001

## Comandos Disponíveis

```bash
npm run dev          # Inicia apenas o Next.js
npm run server       # Inicia apenas o servidor de autenticação
npm run dev:all      # Inicia servidor + Next.js
npm run server:kill  # Mata processo na porta 3001
npm run server:restart # Reinicia o servidor
npm run build        # Build de produção
npm run lint         # Executa o linter
```

## Solução de Problemas

### Erro: "Porta 3001 em uso"

**Solução Rápida:**
```bash
npm run server:restart
```
### Erro: "Not Found is not valid JSON"

Isso significa que o servidor não está rodando. Execute:
```bash
npm run server
```

## Estrutura do Projeto

```
gestao-eventos/
├── src/
│   ├── app/              # Páginas Next.js
│   │   ├── page.tsx      # Login
│   │   ├── signup/       # Cadastro
│   │   ├── dashboard/    # Dashboard administrativo
│   │   ├── events/       # Página pública de eventos
│   │   └── checkout/     # Checkout de ingressos
│   ├── components/       # Componentes React
│   ├── hooks/           # Custom hooks (useAuth, useEvents, etc)
│   ├── store/           # Zustand store (authStore)
│   └── assets/          # Ícones SVG
├── db.json              # Banco de dados JSON
└── server.js            # Servidor de autenticação JWT
```
## Tecnologias

- **Frontend:** Next.js 15, React 19, TypeScript
- **Estilização:** Tailwind CSS
- **Estado Global:** Zustand
- **Autenticação:** JWT (simulado)
- **Backend:** JSON Server
- **Ícones:** SVG customizados

## 📡 Endpoints da API

### Autenticação

- `POST /auth/login` - Login
- `POST /auth/register` - Cadastro

### Dados

- `GET /events` - Listar eventos
- `POST /events` - Criar evento
- `PUT /events/:id` - Atualizar evento
- `DELETE /events/:id` - Deletar evento

- `GET /sectors` - Listar setores
- `GET /coupons` - Listar cupons
- `GET /lots` - Listar lotes
- `GET /settings` - Configurações
- `GET /users` - Usuários


