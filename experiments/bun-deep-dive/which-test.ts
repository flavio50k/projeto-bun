// experiments/bun-deep-dive/which-test.ts

/**
 * Bun.which - Encontrar executáveis no PATH
 */

console.log('🔍 Finding executables with Bun.which\n');

const executables = ['bun', 'node', 'npm', 'git', 'docker', 'code'];

for (const exe of executables) {
  const path = Bun.which(exe);
  if (path) {
    console.log(`✅ ${exe.padEnd(10)} → ${path}`);
  } else {
    console.log(`❌ ${exe.padEnd(10)} → Not found`);
  }
}

// Uso prático: Verificar dependências
console.log('\n🔧 Practical use: Check requirements\n');

const required = ['git', 'docker'];
const missing: string[] = [];

for (const req of required) {
  if (!Bun.which(req)) {
    missing.push(req);
  }
}

if (missing.length > 0) {
  console.log('⚠️  Missing required tools:', missing.join(', '));
  console.log('   Please install them before continuing.');
} else {
  console.log('✅ All required tools are installed!');
}
