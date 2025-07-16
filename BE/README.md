# Todo API with NestJS

This is a NestJS backend application providing APIs for user management and todo items.

## Features

- User management (CRUD operations)
- Todo management (CRUD operations)
- SQLite database with TypeORM

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
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