const Database = require('better-sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, '..', 'intertrack.db')
const db = new Database(dbPath)

db.exec(`
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`)

module.exports = {
  all: (sql, params = []) => db.prepare(sql).all(params),
  get: (sql, params = []) => db.prepare(sql).get(params),
  run: (sql, params = []) => db.prepare(sql).run(params),
  db
}