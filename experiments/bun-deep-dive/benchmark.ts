// experiments/bun-deep-dive/benchmark.ts

/**
 * Benchmark: Comparar startup time
 * Bun vs Node.js
 */

const iterations = 1_000_000;

console.log(`🏁 Starting benchmark - ${iterations.toLocaleString()} iterations\n`);

// Teste 1: String concatenation
console.time('String concatenation');
let str = '';
for (let i = 0; i < iterations; i++) {
  str += 'a';
}
console.timeEnd('String concatenation');

// Teste 2: Array operations
console.time('Array push');
const arr: number[] = [];
for (let i = 0; i < iterations; i++) {
  arr.push(i);
}
console.timeEnd('Array push');

// Teste 3: Object creation
console.time('Object creation');
const objects: Array<{ id: number; name: string }> = [];
for (let i = 0; i < iterations; i++) {
  objects.push({ id: i, name: `User ${i}` });
}
console.timeEnd('Object creation');

// Teste 4: JSON stringify/parse
console.time('JSON operations');
for (let i = 0; i < 100_000; i++) {
  const obj = { id: i, data: 'test'.repeat(10) };
  const json = JSON.stringify(obj);
  JSON.parse(json);
}
console.timeEnd('JSON operations');

console.log('\n✅ Benchmark completed!');
console.log(`Runtime: ${process.versions.bun ? 'Bun' : 'Node.js'}`);
