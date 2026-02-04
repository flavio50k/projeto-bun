// experiments/bun-deep-dive/http-server.ts

/**
 * Bun.serve - HTTP server nativo
 * Mais baixo nível que Elysia, máxima performance
 */

const server = Bun.serve({
  port: 3001,
  
  // Handler principal
  fetch(request) {
    const url = new URL(request.url);
    
    // Rota: GET /
    if (url.pathname === '/') {
      return new Response('Hello from Bun.serve! 🚀', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }
    
    // Rota: GET /json
    if (url.pathname === '/json') {
      return Response.json({
        message: 'JSON response',
        timestamp: new Date().toISOString(),
        method: request.method,
      });
    }
    
    // Rota: GET /headers
    if (url.pathname === '/headers') {
      const headers: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return Response.json({ headers });
    }
    
    // Rota: POST /echo
    if (url.pathname === '/echo' && request.method === 'POST') {
      return new Response(request.body, {
        headers: { 'Content-Type': request.headers.get('Content-Type') || 'text/plain' },
      });
    }
    
    // Rota: GET /stream
    if (url.pathname === '/stream') {
      const stream = new ReadableStream({
        start(controller) {
          let i = 0;
          const interval = setInterval(() => {
            if (i < 10) {
              controller.enqueue(`Data chunk ${i++}\n`);
            } else {
              controller.close();
              clearInterval(interval);
            }
          }, 100);
        },
      });
      
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }
    
    // 404
    return new Response('Not Found', { status: 404 });
  },
  
  // Error handler
  error(error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  },
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`🚀 Bun HTTP Server`);
console.log(`📡 Listening on http://localhost:${server.port}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\nRoutes:');
console.log('  GET  /');
console.log('  GET  /json');
console.log('  GET  /headers');
console.log('  POST /echo');
console.log('  GET  /stream');
console.log('\nPress Ctrl+C to stop');
