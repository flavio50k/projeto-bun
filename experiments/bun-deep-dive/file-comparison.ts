// experiments/bun-deep-dive/file-comparison.ts

/**
 * Comparação: Bun.file vs Node.js fs
 */

import { readFile, writeFile } from 'fs/promises';

const iterations = 1000;
const content = 'Test content '.repeat(100);

console.log(`🏁 File I/O Benchmark - ${iterations} iterations\n`);

// ===== BUN WAY =====
console.time('Bun.write (1000 files)');
for (let i = 0; i < iterations; i++) {
  await Bun.write(`bun-test-${i}.txt`, content);
}
console.timeEnd('Bun.write (1000 files)');

console.time('Bun.file().text() (1000 reads)');
for (let i = 0; i < iterations; i++) {
  await Bun.file(`bun-test-${i}.txt`).text();
}
console.timeEnd('Bun.file().text() (1000 reads)');

// ===== NODE.JS WAY =====
console.time('fs.writeFile (1000 files)');
for (let i = 0; i < iterations; i++) {
  await writeFile(`node-test-${i}.txt`, content);
}
console.timeEnd('fs.writeFile (1000 files)');

console.time('fs.readFile (1000 reads)');
for (let i = 0; i < iterations; i++) {
  await readFile(`node-test-${i}.txt`, 'utf-8');
}
console.timeEnd('fs.readFile (1000 reads)');

// Cleanup
console.log('\n🧹 Cleaning up test files...');
for (let i = 0; i < iterations; i++) {
  await Bun.write(`bun-test-${i}.txt`, ''); // Delete by writing empty
  await Bun.write(`node-test-${i}.txt`, '');
}

console.log('✅ Benchmark completed!');
console.log('💡 Bun is typically 2-3x faster for file I/O');
