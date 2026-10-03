# Eventoo | Event Management System

A full-stack Event Management System built for the Node.js + Express + Mongoose .


### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT authentication
* bcrypt password hashing
* express-validator

### Frontend

* React
* Vite
* React Router
* Axios
* Lucide React
* Custom responsive CSS & MUI

## Core Requirements Covered

* RESTful API with Express
* MongoDB database using Mongoose
* 4 Mongoose models: User, Event, Category, Registration
* JWT authentication and protected routes
* Input validation
* Filtering and pagination on the events endpoint
* Centralized error handling middleware
* Clean MVC-style project structure
* Environment variables using `.env`
* `.env.example` included
* Postman collection included
* Main API endpoints documented and tested in Postman


## Requirements Before Running

Make sure you have:

* Node.js installed
* MongoDB Community Server installed and running locally
* MongoDB Compass is optional and can be used to inspect the database

MongoDB Compass is **not** the database itself. The application connects to MongoDB through Mongoose.


### Demo Account


Email: maher@test.com
Password: 123456


## Run Backend

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/event_management
JWT_SECRET=change_this_secret


Then start the backend:

```bash
npm run dev
```

Expected output:


Connected to mongodb
Default categories added
Server running at http://localhost:3000


Default categories and demo data are inserted automatically when the database is empty.

## Run Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will display the local frontend URL, normally:

```text
http://localhost:5173
```

## MongoDB Compass

To inspect the database using MongoDB Compass, connect to:


mongodb://127.0.0.1:27017


Then open:


event_management


The database contains the following collections:

* users
* events
* categories
* registrations

## API Base URL


http://localhost:3000/api


## Authentication

Register or login to receive a JWT token.

Protected requests use:


Authorization: Bearer YOUR_TOKEN


## Main Endpoints

### Auth


POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me


### Categories


GET    /api/categories
POST   /api/categories
DELETE /api/categories/:id


### Events


GET    /api/events
GET    /api/events/:id
GET    /api/events/mine
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id


Filtering and pagination example:


GET /api/events?search=workshop&category=CATEGORY_ID&page=1&limit=6


### Registrations


GET    /api/registrations/mine
POST   /api/registrations/events/:id
DELETE /api/registrations/events/:id
GET    /api/registrations/events/:id


## Business Rules

* A user must be authenticated to create an event.
* An event creator can edit or delete only their own events.
* An event creator cannot register for their own event.
* A user cannot register for the same event twice.
* A registration is rejected when event capacity is reached.
* Past events cannot be created or updated to a past date.
* Event capacity cannot be reduced below the current number of registrations.
* Only the event owner can view the event registration list.
* Passwords are stored as bcrypt hashes, never as plain text.

## API Testing

The project includes a Postman collection:

Event Management System API.postman_collection

The main API flows and validation cases were tested, including:

* User registration
* User login
* Authentication
* Category operations
* Event CRUD operations
* Event search and pagination
* Event registration
* Duplicate registration prevention
* Registration cancellation
* Event capacity validation
* Owner-only registration access
* Input validation
* Past event date validation


## Project Structure

```text
Event-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
├── postman/
│   └── Event Management System API.postman_collection
│
└── README.md
```

