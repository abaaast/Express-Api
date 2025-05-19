const db = require("../config/database");

const findByUsername = (username, callback) => {
  db.get("SELECT * FROM users WHERE username = ?", [username], callback);
};

const createUser = (username, fullname, hashedPassword, role, callback) => {
  db.run("INSERT INTO users (username, fullname, password, role) VALUES (?, ?, ?, ?)", [username, fullname, hashedPassword, role], function (err) {
    callback(err, this);
  });
};

const getAllUsers = (callback) => {
  db.all("SELECT id, username, fullname, role, stat_active, create_date, update_date FROM users", [], callback);
};

const getUserById = (id, callback) => {
  db.get("SELECT id, username, fullname, role, stat_active, create_date, update_date FROM users WHERE id = ?", [id], callback);
};

const updateUser = (id, username, password, callback) => {
  db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [username, password, id], function (err) {
    callback(err, this);
  });
};

const deleteUser = (id, callback) => {
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    callback(err, this);
  });
};

module.exports = {
  findByUsername,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
