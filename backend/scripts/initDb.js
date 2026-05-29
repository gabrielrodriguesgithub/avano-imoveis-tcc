const bcrypt = require('bcryptjs');
const { initDatabase, get, run } = require('../config/db');

async function seedAdmin() {
  await initDatabase();

  const existing = await get('SELECT id FROM users WHERE email = ?', ['admin@example.com']);

  if (!existing) {
    const passwordHash = bcrypt.hashSync('admin123', 10);
    await run(
      'INSERT INTO users (first_name, last_name, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
      ['Admin', 'Sistema', 'admin', 'admin@example.com', passwordHash, 'admin']
    );
    console.log('Usuário administrador inicial criado: admin@example.com / admin123');
  } else {
    console.log('Usuário administrador já existe.');
  }
}

seedAdmin()
  .then(() => console.log('Banco de dados inicializado com sucesso.'))
  .catch((err) => {
    console.error('Erro ao inicializar o banco de dados:', err);
    process.exit(1);
  });
