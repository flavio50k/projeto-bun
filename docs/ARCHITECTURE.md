# Arquitetura do Projeto

## Visão Geral

Este projeto segue uma arquitetura **monorepo** com separação clara entre frontend, backend e código compartilhado.

## Estrutura de Pastas
```
projeto-bun/
├── apps/
│   ├── backend/           # API REST com Elysia
│   │   ├── src/
│   │   │   ├── routes/    # Definição de rotas
│   │   │   ├── services/  # Lógica de negócio
│   │   │   ├── db/        # Database e ORM
│   │   │   └── ai/        # Módulos de IA
│   │   └── Dockerfile
│   │
│   └── frontend/          # Aplicação Vue 3
│       ├── src/
│       │   ├── components/
│       │   ├── views/
│       │   ├── stores/    # Pinia
│       │   └── composables/
│       └── Dockerfile
│
├── packages/
│   └── shared/            # Código compartilhado
│       ├── schemas/       # Zod schemas
│       └── types/         # TypeScript types
│
└── docker/
    ├── docker-compose.yml      # Desenvolvimento
    └── docker-compose.prod.yml # Produção
```

## Tecnologias

### Runtime
- **Bun:** Runtime JavaScript/TypeScript ultrarrápido

### Backend
- **Elysia:** Framework web type-safe
- **Drizzle ORM:** ORM moderno para PostgreSQL
- **Zod:** Validação de schemas

### Frontend
- **Vue 3:** Framework progressivo
- **Pinia:** State management
- **PrimeVue:** UI Components

### Database
- **PostgreSQL:** Database relacional
- **Valkey:** Cache (Redis fork)

### AI
- **OpenAI API:** GPT-4 para produção
- **Ollama:** LLMs locais
- **Qdrant:** Vector database

## Princípios

1. **Type-Safety:** TypeScript strict mode em todo projeto
2. **Separação de Responsabilidades:** Camadas bem definidas
3. **Testabilidade:** Código facilmente testável
4. **Observabilidade:** Logs, métricas e tracing desde o início
5. **Containerização:** Docker para consistência entre ambientes