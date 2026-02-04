// experiments/bun-deep-dive/password-hashing.ts

/**
 * Bun.password - Hashing seguro de senhas
 * Usa Argon2 (mais seguro que bcrypt)
 */

console.log('🔐 Password Hashing with Bun\n');

const password = 'SuperSecret123!';

// Hash password
console.time('Hash password');
const hash = await Bun.password.hash(password, {
  algorithm: 'argon2id',  // Mais seguro
  memoryCost: 65536,      // 64 MB
  timeCost: 3,            // Iterações
});
console.timeEnd('Hash password');

console.log('Original:', password);
console.log('Hash:', hash);
console.log('Hash length:', hash.length);

// Verify password
console.log('\n🔍 Verifying passwords...\n');

console.time('Verify correct password');
const isValid = await Bun.password.verify(password, hash);
console.timeEnd('Verify correct password');
console.log('Correct password:', isValid);

console.time('Verify wrong password');
const isInvalid = await Bun.password.verify('WrongPassword', hash);
console.timeEnd('Verify wrong password');
console.log('Wrong password:', isInvalid);

// Algoritmos disponíveis
console.log('\n📋 Available algorithms:');
console.log('  - argon2id (recommended)');
console.log('  - argon2i');
console.log('  - argon2d');
console.log('  - bcrypt');

// Exemplo bcrypt
const bcryptHash = await Bun.password.hash(password, {
  algorithm: 'bcrypt',
  cost: 10,
});
console.log('\nBcrypt hash:', bcryptHash);
