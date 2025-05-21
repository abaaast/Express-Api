const db = require("../config/database");

// =====================
// TODO FUNCTIONS
// =====================

// Ambil semua todo
const getAllTodos = (callback) => {
  db.all(
    `
    SELECT t.*, u.username, c.name AS category_name
    FROM tbl_todo t
    LEFT JOIN tbl_users00 u ON t.user_id = u.id
    LEFT JOIN tbl_category c ON t.category_id = c.id
    ORDER BY t.create_date DESC
    `,
    [],
    callback
  );
};

// Ambil todo berdasarkan ID
const getTodoById = (id, callback) => {
  db.get("SELECT * FROM tbl_todo WHERE id = ?", [id], callback);
};

// Tambah todo baru
const createTodo = (todo, callback) => {
  const { user_id, category_id, title, description, priority = 0, status = 0, create_id } = todo;

  db.run(
    `
    INSERT INTO tbl_todo (user_id, category_id, title, description, priority, status, create_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [user_id, category_id, title, description, priority, status, create_id],
    function (err) {
      callback(err, this);
    }
  );
};

// Update todo
const updateTodo = (id, todo, callback) => {
  const { category_id, title, description, priority, status, update_id } = todo;

  db.run(
    `
    UPDATE tbl_todo
    SET category_id = ?, title = ?, description = ?, priority = ?, status = ?, update_id = ?, update_date = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
    [category_id, title, description, priority, status, update_id, id],
    function (err) {
      callback(err, this);
    }
  );
};

// Hapus todo
const deleteTodo = (id, callback) => {
  db.run("DELETE FROM tbl_todo WHERE id = ?", [id], function (err) {
    callback(err, this);
  });
};

// Ambil todo berdasarkan user_id
const getTodosByUserId = (user_id, callback) => {
  db.all("SELECT * FROM tbl_todo WHERE user_id = ? ORDER BY create_date DESC", [user_id], callback);
};

// Ambil todo berdasarkan category_id
const getTodosByCategory = (category_id, callback) => {
  db.all(
    `
    SELECT t.*, c.name AS category_name
    FROM tbl_todo t
    LEFT JOIN tbl_category c ON t.category_id = c.id
    WHERE t.category_id = ?
    ORDER BY t.create_date DESC
    `,
    [category_id],
    callback
  );
};

// =====================
// PROGRESS HISTORY FUNCTIONS
// =====================

// Tambahkan entri ke progress history
const addProgressHistory = (data, callback) => {
  const { todo_id, old_status, new_status, note, update_id } = data;

  db.run(
    `
    INSERT INTO tbl_todo_progress_history (todo_id, old_status, new_status, note, update_id)
    VALUES (?, ?, ?, ?, ?)
    `,
    [todo_id, old_status, new_status, note, update_id],
    function (err) {
      callback(err, this);
    }
  );
};

// Ambil history berdasarkan todo_id
const getProgressHistoryByTodoId = (todo_id, callback) => {
  db.all(
    `
    SELECT h.*, u.username
    FROM tbl_todo_progress_history h
    LEFT JOIN tbl_users00 u ON h.update_id = u.id
    WHERE h.todo_id = ?
    ORDER BY h.update_date DESC
    `,
    [todo_id],
    callback
  );
};

module.exports = {
  // Todo
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosByUserId,
  getTodosByCategory,

  // Progress History
  addProgressHistory,
  getProgressHistoryByTodoId,
};
