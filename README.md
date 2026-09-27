# Student Management REST API

Node.js and Express REST API for managing student records. This project implements
the Lab Assignment 2 requirements using an in-memory JavaScript array instead of a
database.

## Features

- Express.js server
- Modular student routes
- Full CRUD operations
- JSON request and response handling
- Request logging middleware
- Validation and HTTP error responses
- Postman collection for testing
- No MongoDB, MySQL, or Mongoose required

## Requirements

- Node.js 18 or newer
- npm

## Installation

From the project directory, install the dependencies:

```bash
npm install
```

## Start the API

Start the production-style server:

```bash
npm start
```

For development with Node watch mode:

```bash
npm run dev
```

The API is available at `http://localhost:3000`.

## Endpoints

| Method | Endpoint | Description | Success |
| --- | --- | --- | --- |
| GET | `/` | Display API information | 200 |
| GET | `/students` | Return all students | 200 |
| GET | `/students/:id` | Return one student | 200 |
| POST | `/students` | Create a student | 201 |
| PUT | `/students/:id` | Update a student | 200 |
| DELETE | `/students/:id` | Delete a student | 200 |

The `:id` parameter must be an integer. Student request bodies must include both
`name` and `course` as non-empty values.

### Create a student

```http
POST /students
Content-Type: application/json
```

```json
{
  "name": "Neha",
  "course": "BTech"
}
```

Example response:

```json
{
  "message": "Student created successfully",
  "student": {
    "id": 4,
    "name": "Neha",
    "course": "BTech"
  }
}
```

### Update a student

```http
PUT /students/1
Content-Type: application/json
```

```json
{
  "name": "Rahul Kumar",
  "course": "BTech"
}
```

## Error Responses

| Status | Meaning |
| --- | --- |
| 400 | Invalid student ID, missing fields, empty fields, or malformed JSON |
| 404 | Student or route was not found |
| 500 | Unexpected server error |

Example error response:

```json
{
  "error": "Student not found"
}
```

## Testing with Postman

Import the collection at:

```text
postman/Student_Management_REST_API.postman_collection.json
```

It contains requests for the root route, all CRUD operations, and basic validation
and not-found cases.

## Project Structure

```text
Student_Management_REST_API_Assignment/
├── app.js                         # Express application and middleware setup
├── package.json                   # Dependencies and npm scripts
├── data/students.js               # In-memory student data
├── middleware/logger.js           # Request logger
├── routes/studentRoutes.js        # Student CRUD routes
└── postman/                       # Postman collection
```

## Data Storage

Student records are stored only in memory in `data/students.js`. Changes are lost
when the server restarts, and the original sample records are restored. This is
intentional because the assignment requires array/JSON data without a database.
