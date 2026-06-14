# TaskFlow – Task Management System

## Overview

TaskFlow is a full-stack Task Management System that helps users organize, track, and manage tasks efficiently. The application includes secure user authentication, task creation and management, analytics, and profile tracking.

## Features

* User Registration and Login
* JWT Authentication
* Create Tasks
* View Tasks
* Edit Tasks
* Delete Tasks
* Task Status Tracking
  * Pending
  * In Progress
  * Completed
* Dashboard Analytics
* User Profile Management
* MongoDB Database Integration

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Deployment

* Frontend: Netlify
* Backend: Render

## Project Structure

```text
task-manager/
│
├── client/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── dashboard.js
│   │   ├── tasks.js
│   │   ├── create-task.js
│   │   ├── edit-task.js
│   │   ├── profile.js
│   │   └── analytics.js
│   │
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── tasks.html
│   ├── create-task.html
│   ├── edit-task.html
│   ├── profile.html
│   └── analytics.html
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── profileRoutes.js
│
├── server.js
├── package.json
└── README.md
```


## Live Demo

Frontend:
https://monika-taskflow.netlify.app

Backend:
https://taskflow-backend-q2ia.onrender.com

## Author

Monika L

Computer Science and Engineering Student

## License

This project is created for educational and learning purposes.
