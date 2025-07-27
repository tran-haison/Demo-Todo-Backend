const { body } = require('express-validator');

// Validation rules for creating/updating todos
exports.validateTodo = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Title is required and must be between 1 and 100 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot be more than 500 characters'),

    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),

    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date')
]; 