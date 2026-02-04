// experiments/bun-deep-dive/sqlite-demo.ts

/**
 * Bun SQLite - Database embutido
 * Zero dependências, muito rápido
 */

import { Database } from 'bun:sqlite';

console.log('🗄️  Bun SQLite Demo\n');

// Criar database (em memória)
const db = new Database(':memory:');

// Criar tabela
db.run(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ Table created\n');

// Inserir dados
const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');

insert.run('Flávio Luiz Bé', 'flavio50k@protonmail.com');
insert.run('Test User', 'test@example.com');
insert.run('Another User', 'another@example.com');

console.log('✅ Data inserted\n');

// Buscar todos
console.log('📋 All users:');
const all = db.query('SELECT * FROM users').all();
console.table(all);

// Buscar um
console.log('\n🔍 Find by email:');
const one = db.query('SELECT * FROM users WHERE email = ?').get('flavio50k@protonmail.com');
console.log(one);

// Contar
const count = db.query('SELECT COUNT(*) as total FROM users').get() as { total: number };
console.log('\n📊 Total users:', count.total);

// Performance test
console.log('\n⚡ Performance test: Insert 10,000 rows\n');

db.run('DELETE FROM users');

console.time('Insert 10K rows');
db.run('BEGIN');
for (let i = 0; i < 10_000; i++) {
  insert.run(`User ${i}`, `user${i}@example.com`);
}
db.run('COMMIT');
console.timeEnd('Insert 10K rows');

const finalCount = db.query('SELECT COUNT(*) as total FROM users').get() as { total: number };
console.log('Total after bulk insert:', finalCount.total);

// Fechar
db.close();
console.log('\n✅ Database closed');
