#!/bin/bash

# Docker Compose scripts for Todo List API
# Usage: ./docker-scripts.sh [command]

case "$1" in
  "start")
    echo "Starting Todo List API with Docker Compose..."
    docker-compose up -d
    echo "Services started! Access at:"
    echo "- API: http://localhost:3000"
    echo "- MongoDB Express: http://localhost:8081 (admin/password123)"
    ;;
  "dev")
    echo "Starting Todo List API in development mode..."
    docker-compose -f docker-compose.dev.yml up -d
    echo "Development services started! Access at:"
    echo "- API: http://localhost:3000"
    echo "- MongoDB Express: http://localhost:8081 (admin/password123)"
    ;;
  "stop")
    echo "Stopping all services..."
    docker-compose down
    ;;
  "stop-dev")
    echo "Stopping development services..."
    docker-compose -f docker-compose.dev.yml down
    ;;
  "restart")
    echo "Restarting services..."
    docker-compose down
    docker-compose up -d
    ;;
  "logs")
    echo "Showing logs..."
    docker-compose logs -f
    ;;
  "logs-dev")
    echo "Showing development logs..."
    docker-compose -f docker-compose.dev.yml logs -f
    ;;
  "build")
    echo "Building containers..."
    docker-compose build
    ;;
  "build-dev")
    echo "Building development containers..."
    docker-compose -f docker-compose.dev.yml build
    ;;
  "clean")
    echo "Cleaning up everything (including volumes)..."
    docker-compose down -v
    docker system prune -f
    ;;
  "status")
    echo "Container status:"
    docker-compose ps
    ;;
  "shell")
    echo "Opening shell in app container..."
    docker-compose exec app sh
    ;;
  "mongo")
    echo "Opening MongoDB shell..."
    docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
    ;;
  *)
    echo "Usage: $0 {start|dev|stop|stop-dev|restart|logs|logs-dev|build|build-dev|clean|status|shell|mongo}"
    echo ""
    echo "Commands:"
    echo "  start     - Start production services"
    echo "  dev       - Start development services (with hot reload)"
    echo "  stop      - Stop production services"
    echo "  stop-dev  - Stop development services"
    echo "  restart   - Restart production services"
    echo "  logs      - Show production logs"
    echo "  logs-dev  - Show development logs"
    echo "  build     - Build production containers"
    echo "  build-dev - Build development containers"
    echo "  clean     - Clean up everything (including volumes)"
    echo "  status    - Show container status"
    echo "  shell     - Open shell in app container"
    echo "  mongo     - Open MongoDB shell"
    exit 1
    ;;
esac 