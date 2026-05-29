const { run, get, all } = require('../config/db');

function createSupportMessage(message) {
  const sql = `INSERT INTO support_messages (user_id, name, email, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)`;
  return run(sql, [message.user_id, message.name, message.email, message.subject, message.message, message.status || 'novo']);
}

function findSupportMessages() {
  return all('SELECT * FROM support_messages ORDER BY created_at DESC');
}

function findSupportMessageById(id) {
  return get('SELECT * FROM support_messages WHERE id = ?', [id]);
}

function updateSupportMessage(id, data) {
  const sql = `UPDATE support_messages SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return run(sql, [data.status, id]);
}

function deleteSupportMessage(id) {
  return run('DELETE FROM support_messages WHERE id = ?', [id]);
}

module.exports = {
  createSupportMessage,
  findSupportMessages,
  findSupportMessageById,
  updateSupportMessage,
  deleteSupportMessage,
};
