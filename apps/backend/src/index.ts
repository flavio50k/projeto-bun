// apps/backend/src/index.ts

import { Elysia } from 'elysia';
import { config } from './config/env';
import { routes } from './routes';

/**
 * Aplicação principal Elysia
 * Entry point do backend
 */
const app = new Elysia()
  // Usar rotas importadas
  .use(routes)
  
  // Iniciar servidor
  .listen(config.port, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🚀 ${config.app.name}`);
    console.log(`📡 Server running at http://${config.host}:${config.port}`);
    console.log(`⚙️  Environment: ${config.env}`);
    console.log(`🔥 Hot reload: ${config.isDevelopment ? 'ENABLED' : 'DISABLED'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  });

// Export para testes futuros
export { app };