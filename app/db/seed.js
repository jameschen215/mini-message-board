import { db } from './sql-db.js';

db.exec('DELETE FROM message');

const stmt = db.prepare('INSERT INTO message (user, text) VALUES (?, ?)');
stmt.run('Alice', 'Hello from Alice!');
stmt.run('Bob', 'This is Bob.');
stmt.run('Charlie', 'Greetings from Charlie.');

console.log('Sample messages added.');
