const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, fullname: user.fullname, role: user.role, stat_active: user.stat_active }, process.env.AUTH_JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = generateToken;
