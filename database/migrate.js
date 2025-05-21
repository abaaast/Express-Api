const db = require("../src/config/database");

// STATUS:
// 0 = Not Started
// 1 = In Progress
// 2 = Waiting for Feedback
// 8 = Pending
// 9 = Finished

// PRIORITY:
// 0 = Low
// 1 = Medium
// 2 = High

// Tabel Users
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS tbl_users00 (
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

// Tabel Kategori Todo
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS tbl_category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      stat_active INTEGER NOT NULL DEFAULT 1
    )
    `,
    (err) => {
      if (err) console.error("Create table tbl_category error:", err);
      else console.log("Table tbl_category created or already exists");
    }
  );
});

// Tabel Todo List
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS tbl_todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      category_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      priority INTEGER DEFAULT 0, -- 0: low, 1: medium, 2: high
      status INTEGER NOT NULL DEFAULT 0, -- 0: not started, 1: in progress, 2: waiting for feedback, 8: pending, 9: finished
      create_id INTEGER NOT NULL,
      create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      update_id INTEGER NULL,
      update_date DATETIME NULL,
      FOREIGN KEY(user_id) REFERENCES tbl_users00(id) ON DELETE CASCADE,
      FOREIGN KEY(category_id) REFERENCES tbl_category(id) ON DELETE SET NULL
    )
  `,
    (err) => {
      if (err) console.error("Create table tbl_todo error:", err);
      else console.log("Table tbl_todo created or already exists");
    }
  );
});

// Tabel Kolaborator Todo
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS tbl_todo_collaborators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo_id INTEGER NOT NULL,
      collaborator_id INTEGER NOT NULL,
      FOREIGN KEY(todo_id) REFERENCES tbl_todo(id) ON DELETE CASCADE,
      FOREIGN KEY(collaborator_id) REFERENCES tbl_users00(id) ON DELETE CASCADE,
      UNIQUE(todo_id, collaborator_id)
    )
    `,
    (err) => {
      if (err) console.error("Create table tbl_todo_collaborators error:", err);
      else console.log("Table tbl_todo_collaborators created or already exists");
    }
  );
});

// Tabel Progress History
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS tbl_todo_progress_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo_id INTEGER NOT NULL,
      old_status INTEGER,
      new_status INTEGER NOT NULL,
      note TEXT,
      update_id INTEGER NOT NULL,
      update_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(todo_id) REFERENCES tbl_todo(id) ON DELETE CASCADE,
      FOREIGN KEY(update_id) REFERENCES tbl_users00(id) ON DELETE SET NULL
    )
    `,
    (err) => {
      if (err) console.error("Create table tbl_todo_progress_history error:", err);
      else console.log("Table tbl_todo_progress_history created or already exists");
    }
  );
});

db.run(`CREATE INDEX IF NOT EXISTS idx_todo_user ON tbl_todo(user_id)`);
db.run(`CREATE INDEX IF NOT EXISTS idx_progress_todo ON tbl_todo_progress_history(todo_id)`);
db.run(`CREATE INDEX IF NOT EXISTS idx_collab_todo ON tbl_todo_collaborators(todo_id)`);
