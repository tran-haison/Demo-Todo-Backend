const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config({ path: './config.env' });

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', require('./routes/todos'));

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Todo List API',
        version: '1.0.0',
        endpoints: {
            'GET /api/todos': 'Get all todos',
            'GET /api/todos/:id': 'Get single todo',
            'POST /api/todos': 'Create new todo',
            'PUT /api/todos/:id': 'Update todo',
            'DELETE /api/todos/:id': 'Delete todo',
            'PATCH /api/todos/:id/toggle': 'Toggle todo completion'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
}); 