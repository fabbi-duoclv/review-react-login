# Todo API with NestJS

This is a NestJS backend application providing APIs for user management and todo items.

## Features

- User management (CRUD operations)
- Todo management (CRUD operations)
- MySQL database with Prisma ORM
- Docker and Docker Compose support

## Prerequisites

- Node.js (v18+)
- Docker and Docker Compose

## Installation

```bash
# Install dependencies
npm install
```

## Running with Docker

```bash
# Start the MySQL database and API containers
npm run docker:up

# Run the setup script to initialize the database
./setup.sh

# Stop the containers
npm run docker:down
```

## Running locally

```bash
# Start only the MySQL container
docker-compose up -d mysql

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start the application in development mode
npm run start:dev

# Start the application in production mode
npm run start:prod
```

## Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

## API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Todos

- `GET /todos` - Get all todos
- `GET /todos?userId=1` - Get todos for a specific user
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Example Requests

### Create a User

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com"
}'
```

### Create a Todo

```bash
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{
  "title": "Learn NestJS",
  "userId": 1
}'
``` 