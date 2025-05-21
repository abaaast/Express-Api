const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", (req, res) => {
  // #swagger.tags = ['Todo']
  todoController.getAllTodos(req, res);
});

router.get("/:id", (req, res) => {
  // #swagger.tags = ['Todo']
  todoController.getTodoById(req, res);
});

router.post("/", (req, res) => {
  // #swagger.tags = ['Todo']
  todoController.createTodo(req, res);
});

router.put("/:id", (req, res) => {
  // #swagger.tags = ['Todo']
  todoController.updateTodo(req, res);
});

router.delete("/:id", (req, res) => {
  // #swagger.tags = ['Todo']
  todoController.deleteTodo(req, res);
});

router.get("/category/:category_id", (req, res) => {
  // #swagger.tags = ['Todo']
  todoController.getTodosByCategory(req, res);
});

router.get("/:todo_id/history", (req, res) => {
  // #swagger.tags = ['Todo']
  todoController.getProgressHistory(req, res);
});

module.exports = router;
