const db = require("../src/config/database");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      fullname TEXT NOT NULL,
      password TEXT NOT NULL,
      role INTEGER NOT NULL,
      stat_active INTEGER NOT NULL DEFAULT 0,
      create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      update_date DATETIME NULL
    )
  `,
    (err) => {
      if (err) console.error("Create table users error:", err);
      else console.log("Table users created or already exists");
    }
  );
});
