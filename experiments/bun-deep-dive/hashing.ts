// experiments/bun-deep-dive/hashing.ts

/**
 * Bun.hash - Hashing rápido (não para senhas!)
 * Para checksums, cache keys, etc.
 */

console.log('⚡ Fast Hashing with Bun\n');

const data = 'Hello, Bun!';

// Wyhash (mais rápido)
console.time('Wyhash');
const wyhash = Bun.hash(data);
console.timeEnd('Wyhash');
console.log('Wyhash:', wyhash);

// CityHash
console.time('CityHash');
const cityhash = Bun.hash.wyhash(data);
console.timeEnd('CityHash');
console.log('CityHash:', cityhash);

// Adler32 (checksum)
console.time('Adler32');
const adler = Bun.hash.adler32(data);
console.timeEnd('Adler32');
console.log('Adler32:', adler);

// CRC32
console.time('CRC32');
const crc = Bun.hash.crc32(data);
console.timeEnd('CRC32');
console.log('CRC32:', crc);

// Benchmark
console.log('\n🏁 Performance test: 1 million hashes\n');

const iterations = 1_000_000;

console.time('Wyhash (1M)');
for (let i = 0; i < iterations; i++) {
  Bun.hash(`data-${i}`);
}
console.timeEnd('Wyhash (1M)');

console.log('\n💡 Use Bun.hash for cache keys, not passwords!');
console.log('   For passwords, use Bun.password.hash()');
