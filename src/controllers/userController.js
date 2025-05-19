const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ message: "Error retrieving users" });
    res.json(users);
  });
};

const getUser = (req, res) => {
  const id = req.params.id;
  userModel.getUserById(id, (err, user) => {
    if (err || !user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  userModel.updateUser(id, username, hashedPassword, (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    res.json({ message: "User updated successfully" });
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userModel.deleteUser(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "User deleted successfully" });
  });
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
