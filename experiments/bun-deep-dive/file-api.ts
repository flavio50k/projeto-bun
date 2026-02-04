// experiments/bun-deep-dive/file-api.ts

/**
 * Bun File API - I/O otimizado
 */

// ===== ESCRITA DE ARQUIVOS =====

console.log('📝 Testing Bun File API\n');

// Método 1: Bun.write (mais simples)
await Bun.write('output1.txt', 'Hello from Bun.write!');
console.log('✅ Created output1.txt');

// Método 2: Bun.write com objeto
await Bun.write('output2.json', JSON.stringify({
  message: 'JSON file',
  timestamp: new Date().toISOString(),
  author: 'Bun',
}, null, 2));
console.log('✅ Created output2.json');

// Método 3: BunFile.write
const file = Bun.file('output3.txt');
await file.write('Content from BunFile.write');
console.log('✅ Created output3.txt');

// ===== LEITURA DE ARQUIVOS =====

console.log('\n📖 Reading files...\n');

// Ler como texto
const text1 = await Bun.file('output1.txt').text();
console.log('output1.txt:', text1);

// Ler como JSON
const json = await Bun.file('output2.json').json();
console.log('output2.json:', json);

// Ler como ArrayBuffer (binário)
const buffer = await Bun.file('output1.txt').arrayBuffer();
console.log('Buffer size:', buffer.byteLength, 'bytes');

// Ler como stream (para arquivos grandes)
const stream = Bun.file('output1.txt').stream();
console.log('Stream type:', stream.constructor.name);

// ===== INFORMAÇÕES DO ARQUIVO =====

console.log('\n📊 File info:\n');

const fileInfo = Bun.file('output1.txt');
console.log('Size:', fileInfo.size, 'bytes');
console.log('Type:', fileInfo.type);
console.log('Name:', fileInfo.name);
console.log('Exists:', await fileInfo.exists());

// ===== PERFORMANCE TEST =====

console.log('\n⚡ Performance test: Write 10,000 lines\n');

console.time('Bun.write large file');
const lines = Array.from({ length: 10_000 }, (_, i) => `Line ${i + 1}: ${Math.random()}`);
await Bun.write('large-file.txt', lines.join('\n'));
console.timeEnd('Bun.write large file');

const largeFile = Bun.file('large-file.txt');
console.log('Large file size:', (largeFile.size / 1024).toFixed(2), 'KB');

console.log('\n✅ File API tests completed!');
