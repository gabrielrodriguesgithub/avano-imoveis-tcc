const { run, get, all } = require('../config/db');

function getAllConfig() {
  return all('SELECT key, value FROM config');
}

function getConfigByKey(key) {
  return get('SELECT key, value FROM config WHERE key = ?', [key]);
}

function upsertConfig(key, value) {
  return run(`INSERT INTO config (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`, [key, value]);
}

module.exports = {
  getAllConfig,
  getConfigByKey,
  upsertConfig,
};
