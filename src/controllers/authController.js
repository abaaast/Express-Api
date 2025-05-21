require("dotenv").config();
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const response = require("../utils/response");
const STATUS_RESPONSE = require("../utils/constant");

const saltRounds = parseInt(process.env.AUTH_SALT_ROUNDS, 10) || 10;

const register = (req, res) => {
  const { username, fullname, password, role } = req.body;

  userModel.findByUsername(username, (err, user) => {
    if (user) return response.error(res, "Username already taken", STATUS_RESPONSE.CONFLICT);

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    userModel.createUser(username, fullname, hashedPassword, role, (err, result) => {
      if (err) return response.error(res, "Error registering user", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
      response.success(res, "User registered successfully");
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return response.error(res, "Username and password are required", STATUS_RESPONSE.BAD_REQUEST);
  }

  userModel.findByUsername(username, (err, user) => {
    if (!user || !user.password) {
      return response.error(res, "Invalid credentials", STATUS_RESPONSE.UNAUTHORIZED);
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return response.error(res, "Wrong credentials", STATUS_RESPONSE.UNAUTHORIZED);

    const token = generateToken(user);
    response.success(res, "Login successfully", { token });
  });
};

module.exports = {
  register,
  login,
};
