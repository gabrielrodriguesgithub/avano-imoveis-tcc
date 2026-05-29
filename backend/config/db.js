const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '..', 'db', 'database.sqlite');
const initSqlPath = path.join(__dirname, '..', 'db', 'init.sql');

function initDatabase() {
  const dbDir = path.dirname(databasePath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        return reject(err);
      }
    });

    db.serialize(() => {
      db.run('PRAGMA foreign_keys = ON');

      if (fs.existsSync(initSqlPath)) {
        const sql = fs.readFileSync(initSqlPath, 'utf8');
        db.exec(sql, (err) => {
          db.close();
          if (err) {
            return reject(err);
          }
          resolve();
        });
      } else {
        db.close();
        resolve();
      }
    });
  });
}

function openConnection() {
  const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error('Falha ao abrir o banco de dados:', err);
      throw err;
    }
  });

  db.run('PRAGMA foreign_keys = ON');
  return db;
}

function run(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = openConnection();
    db.run(query, params, function (err) {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = openConnection();
    db.get(query, params, (err, row) => {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

function all(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = openConnection();
    db.all(query, params, (err, rows) => {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  initDatabase,
  run,
  get,
  all,
};
