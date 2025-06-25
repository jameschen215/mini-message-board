import { DatabaseSync } from 'node:sqlite';

export const db = new DatabaseSync('mmb.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    text TEXT NOT NULL,
    added DATETIME DEFAULT (DATETIME('now', 'localtime'))
  )
`);
