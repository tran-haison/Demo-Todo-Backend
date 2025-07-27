// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the todo-list database
db = db.getSiblingDB('todo-list');

// Create a user for the todo application
db.createUser({
    user: 'todo_user',
    pwd: 'todo_password',
    roles: [
        {
            role: 'readWrite',
            db: 'todo-list'
        }
    ]
});

// Create initial collections
db.createCollection('todos');

// Create indexes for better performance
db.todos.createIndex({ "completed": 1, "createdAt": -1 });
db.todos.createIndex({ "priority": 1 });
db.todos.createIndex({ "dueDate": 1 });

print('MongoDB initialization completed successfully!'); 