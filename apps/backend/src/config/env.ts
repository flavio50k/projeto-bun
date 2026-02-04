// apps/backend/src/config/env.ts

/**
 * Configurações de ambiente da aplicação
 * Centraliza todas as variáveis de ambiente e configurações
 */

export const config = {
  // Servidor
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',
  
  // Ambiente
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Aplicação
  app: {
    name: 'Projeto Bun - Curso Fullstack',
    version: '0.1.0',
    author: 'Flávio Luiz Bé',
  },
  
  // Tecnologias
  technologies: {
    runtime: 'Bun',
    framework: 'Elysia',
    language: 'TypeScript',
  },
} as const;  // 'as const' = Torna read-only (imutável)

// Tipo inferido automaticamente
export type Config = typeof config;
