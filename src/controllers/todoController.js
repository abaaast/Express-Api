const todoModel = require("../models/todoModel");
const response = require("../utils/response");
const STATUS_RESPONSE = require("../utils/constant");

const getAllTodos = (req, res) => {
  todoModel.getAllTodos((err, rows) => {
    if (err) return response.error(res, "Failed to get todos", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Todos fetched successfully", rows);
  });
};

const getTodoById = (req, res) => {
  const { id } = req.params;
  todoModel.getTodoById(id, (err, todo) => {
    if (err || !todo) return response.error(res, "Todo not found", STATUS_RESPONSE.NOT_FOUND);
    response.success(res, "Todo fetched", todo);
  });
};

const getTodosByCategory = (req, res) => {
  const { category_id } = req.params;
  todoModel.getTodosByCategory(category_id, (err, todos) => {
    if (err) return response.error(res, "Failed to get todos by category", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Todos fetched", todos);
  });
};

const createTodo = (req, res) => {
  const data = req.body;
  todoModel.createTodo(data, (err, result) => {
    if (err) return response.error(res, "Failed to create todo", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Todo created", { id: result.lastID });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  todoModel.updateTodo(id, data, (err) => {
    if (err) return response.error(res, "Failed to update todo", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Todo updated");
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  todoModel.deleteTodo(id, (err) => {
    if (err) return response.error(res, "Failed to delete todo", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Todo deleted");
  });
};

const getProgressHistory = (req, res) => {
  const { todo_id } = req.params;
  todoModel.getProgressHistory(todo_id, (err, rows) => {
    if (err) return response.error(res, "Failed to get history", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Progress history fetched", rows);
  });
};

const addProgressHistory = (req, res) => {
  const data = req.body;
  todoModel.addProgressHistory(data, (err, result) => {
    if (err) return response.error(res, "Failed to add history", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Progress history added", { id: result.lastID });
  });
};

const addCollaborator = (req, res) => {
  const data = req.body;
  todoModel.addCollaborator(data, (err) => {
    if (err) return response.error(res, "Failed to add collaborator", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Collaborator added");
  });
};

const removeCollaborator = (req, res) => {
  const { todo_id, collaborator_id } = req.params;
  todoModel.removeCollaborator(todo_id, collaborator_id, (err) => {
    if (err) return response.error(res, "Failed to remove collaborator", STATUS_RESPONSE.INTERNAL_SERVER_ERROR);
    response.success(res, "Collaborator removed");
  });
};

module.exports = {
  getAllTodos,
  getTodoById,
  getTodosByCategory,
  createTodo,
  updateTodo,
  deleteTodo,
  getProgressHistory,
  addProgressHistory,
  addCollaborator,
  removeCollaborator,
};
