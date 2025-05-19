const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  // #swagger.tags = ['User']
  userController.getAllUsers(req, res);
});

router.get("/:id", (req, res) => {
  // #swagger.tags = ['User']
  userController.getUser(req, res);
});

router.put("/:id", (req, res) => {
  // #swagger.tags = ['User']
  userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  // #swagger.tags = ['User']
  userController.deleteUser(req, res);
});

module.exports = router;
