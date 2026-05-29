const { run, get, all } = require('../config/db');

function createUser(user) {
  const sql = `INSERT INTO users (first_name, last_name, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)`;
  return run(sql, [user.first_name, user.last_name, user.username, user.email, user.password_hash, user.role || 'user']);
}

function findByEmail(email) {
  return get('SELECT * FROM users WHERE email = ?', [email]);
}

function findById(id) {
  return get('SELECT id, first_name, last_name, username, email, role, created_at, updated_at FROM users WHERE id = ?', [id]);
}

function findAll() {
  return all('SELECT id, first_name, last_name, username, email, role, created_at, updated_at FROM users');
}

function updateUser(id, user) {
  const sql = `UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return run(sql, [user.first_name, user.last_name, user.username, user.email, user.role || 'user', id]);
}

function deleteUser(id) {
  return run('DELETE FROM users WHERE id = ?', [id]);
}

module.exports = {
  createUser,
  findByEmail,
  findById,
  findAll,
  updateUser,
  deleteUser,
};
