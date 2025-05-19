const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", (req, res) => {
  // #swagger.tags = ['Auth']
  authController.login(req, res);
});

router.post("/register", (req, res) => {
  // #swagger.tags = ['Auth']
  authController.register(req, res);
});

module.exports = router;
