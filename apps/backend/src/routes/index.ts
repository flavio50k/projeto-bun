// apps/backend/src/routes/index.ts

import { Elysia } from 'elysia';
import { config } from '../config/env';

/**
 * Configuração de todas as rotas da aplicação
 */
export const routes = new Elysia({ prefix: '' })
  
  // Rota raiz - GET /
  .get('/', () => {
    return {
      message: 'Hello from Bun + Elysia! 🚀',
      timestamp: new Date().toISOString(),
    };
  })
  
  // Rota de saúde - GET /health
  .get('/health', () => {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: config.env,
    };
  })
  
  // Rota com parâmetro - GET /hello/:name
  .get('/hello/:name', ({ params }) => {
    const { name } = params;
    return {
      message: `Hello, ${name}! 👋`,
      timestamp: new Date().toISOString(),
    };
  })
  
  // Rota de informações - GET /api/info
  .get('/api/info', () => {
    return {
      app: config.app.name,
      version: config.app.version,
      author: config.app.author,
      technologies: config.technologies,
      environment: config.env,
    };
  });
