// experiments/bun-deep-dive/websocket-server.ts

/**
 * Bun WebSocket Server
 * Real-time communication
 */

type WebSocketData = {
  username: string;
  connectedAt: Date;
};

const server = Bun.serve<WebSocketData>({
  port: 3002,
  
  fetch(req, server) {
    const url = new URL(req.url);
    
    // Upgrade para WebSocket
    if (url.pathname === '/ws') {
      const username = url.searchParams.get('username') || 'Anonymous';
      
      const success = server.upgrade(req, {
        data: {
          username,
          connectedAt: new Date(),
        },
      });
      
      if (success) return undefined;
    }
    
    // Página HTML de teste
    if (url.pathname === '/') {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head><title>Bun WebSocket Test</title></head>
        <body>
          <h1>Bun WebSocket Test</h1>
          <input id="username" placeholder="Username" value="Flavio" />
          <button onclick="connect()">Connect</button>
          <button onclick="disconnect()">Disconnect</button>
          <br><br>
          <input id="message" placeholder="Message" />
          <button onclick="send()">Send</button>
          <div id="messages" style="margin-top:20px; font-family:monospace;"></div>
          
          <script>
            let ws = null;
            
            function connect() {
              const username = document.getElementById('username').value;
              ws = new WebSocket('ws://localhost:3002/ws?username=' + username);
              
              ws.onopen = () => addMessage('✅ Connected!');
              ws.onmessage = (e) => addMessage('📨 ' + e.data);
              ws.onclose = () => addMessage('❌ Disconnected');
              ws.onerror = (e) => addMessage('⚠️ Error: ' + e.message);
            }
            
            function disconnect() {
              if (ws) ws.close();
            }
            
            function send() {
              const msg = document.getElementById('message').value;
              if (ws && msg) {
                ws.send(msg);
                document.getElementById('message').value = '';
              }
            }
            
            function addMessage(msg) {
              const div = document.getElementById('messages');
              div.innerHTML += msg + '<br>';
              div.scrollTop = div.scrollHeight;
            }
          </script>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      });
    }
    
    return new Response('Not Found', { status: 404 });
  },
  
  websocket: {
    open(ws) {
      const { username, connectedAt } = ws.data;
      console.log(`✅ ${username} connected at ${connectedAt.toISOString()}`);
      ws.send(`Welcome, ${username}!`);
      ws.subscribe('chat');
      server.publish('chat', `${username} joined the chat`);
    },
    
    message(ws, message) {
      const { username } = ws.data;
      console.log(`💬 ${username}: ${message}`);
      server.publish('chat', `${username}: ${message}`);
    },
    
    close(ws) {
      const { username } = ws.data;
      console.log(`❌ ${username} disconnected`);
      server.publish('chat', `${username} left the chat`);
    },
  },
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`🚀 Bun WebSocket Server`);
console.log(`📡 HTTP: http://localhost:${server.port}`);
console.log(`🔌 WS:   ws://localhost:${server.port}/ws`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
