require("dotenv").config();
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const saltRounds = parseInt(process.env.AUTH_SALT_ROUNDS, 10) || 10;

const register = (req, res) => {
  const { username, fullname, password, role } = req.body;

  userModel.findByUsername(username, (err, user) => {
    if (user) return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    userModel.createUser(username, fullname, hashedPassword, role, (err, result) => {
      if (err) return res.status(500).json({ message: "Error registering user" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  userModel.findByUsername(username, (err, user) => {
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token });
  });
};

module.exports = {
  register,
  login,
};
