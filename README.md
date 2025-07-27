# Todo List API

A simple CRUD (Create, Read, Update, Delete) todo list API built with Node.js, Express, MongoDB, and Mongoose.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Toggle todo completion status
- ✅ Filter todos by completion status and priority
- ✅ Sort todos by different fields
- ✅ Input validation and error handling
- ✅ RESTful API design
- ✅ MongoDB with Mongoose ODM

## Prerequisites

- Node.js (v14 or higher) - for local development
- MongoDB (local installation or MongoDB Atlas) - for local development
- Docker and Docker Compose - for containerized deployment

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `config.env` and modify the MongoDB connection string if needed
   - Default configuration uses local MongoDB: `mongodb://localhost:27017/todo-list`

4. Start MongoDB (if using local installation):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or start manually
   mongod
   ```

## Running the Application

### Option 1: Local Development

#### Development mode (with auto-restart):
```bash
npm run dev
```

#### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

### Option 2: Docker Compose (Recommended)

#### Production mode with Docker:
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

#### Development mode with Docker:
```bash
# Build and start all services in development mode
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop all services
docker-compose -f docker-compose.dev.yml down
```

#### Access the services:
- **Todo API**: http://localhost:3000
- **MongoDB Express (Admin UI)**: http://localhost:8081
  - Username: `admin`
  - Password: `password123`

#### Docker commands:
```bash
# Rebuild containers after code changes
docker-compose build

# View running containers
docker-compose ps

# Access container shell
docker-compose exec app sh

# View MongoDB logs
docker-compose logs mongodb

# Clean up everything (including volumes)
docker-compose down -v
```

## API Endpoints

### Base URL: `http://localhost:3000/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all todos |
| GET | `/:id` | Get single todo |
| POST | `/` | Create new todo |
| PUT | `/:id` | Update todo |
| DELETE | `/:id` | Delete todo |
| PATCH | `/:id/toggle` | Toggle todo completion |

### Query Parameters (for GET /)

- `completed`: Filter by completion status (`true` or `false`)
- `priority`: Filter by priority (`low`, `medium`, `high`)
- `sortBy`: Sort field (`title`, `createdAt`, `dueDate`, etc.)
- `order`: Sort order (`asc` or `desc`)

## API Examples

### Create a Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Study Express and MongoDB",
    "priority": "high",
    "dueDate": "2024-01-15"
  }'
```

### Get All Todos
```bash
curl http://localhost:3000/api/todos
```

### Get Todos with Filters
```bash
# Get only completed todos
curl "http://localhost:3000/api/todos?completed=true"

# Get high priority todos sorted by creation date
curl "http://localhost:3000/api/todos?priority=high&sortBy=createdAt&order=desc"
```

### Update a Todo
```bash
curl -X PUT http://localhost:3000/api/todos/TODO_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "completed": true
  }'
```

### Toggle Todo Completion
```bash
curl -X PATCH http://localhost:3000/api/todos/TODO_ID/toggle
```

### Delete a Todo
```bash
curl -X DELETE http://localhost:3000/api/todos/TODO_ID
```

## Todo Schema

```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String (enum: 'low', 'medium', 'high', default: 'medium'),
  dueDate: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 1
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [...]
}
```

## Project Structure

```
├── config/
│   └── database.js      # MongoDB connection
├── controllers/
│   └── todoController.js # Todo CRUD operations
├── middleware/
│   └── validation.js    # Input validation
├── models/
│   └── Todo.js          # Mongoose schema
├── routes/
│   └── todos.js         # API routes
├── config.env           # Environment variables
├── package.json         # Dependencies
├── server.js           # Main server file
├── Dockerfile          # Production Docker image
├── Dockerfile.dev      # Development Docker image
├── docker-compose.yml  # Production Docker Compose
├── docker-compose.dev.yml # Development Docker Compose
├── mongo-init.js       # MongoDB initialization script
├── healthcheck.js      # Docker health check
├── .dockerignore       # Docker ignore file
└── README.md           # This file
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## License

MIT 