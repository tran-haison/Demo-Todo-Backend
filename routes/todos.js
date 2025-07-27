const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo } = require('../middleware/validation');

// GET /api/todos - Get all todos
router.get('/', todoController.getAllTodos);

// GET /api/todos/:id - Get single todo
router.get('/:id', todoController.getTodo);

// POST /api/todos - Create new todo
router.post('/', validateTodo, todoController.createTodo);

// PUT /api/todos/:id - Update todo
router.put('/:id', validateTodo, todoController.updateTodo);

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', todoController.deleteTodo);

// PATCH /api/todos/:id/toggle - Toggle todo completion status
router.patch('/:id/toggle', todoController.toggleTodo);

module.exports = router; 