# Chat Application

This real-time chat application enables users to register, login, and interact in chat rooms. It leverages a modern tech stack:

Frontend: React, React Router, Axios, Socket.io-client

Backend: Node.js, Express, MongoDB, Mongoose, Socket.io, JWT

## Features

User Management: Registration, login, and logout functionalities.

Real-time Chat: Send and receive text and image messages in chat rooms.

## Security:

JWT for secure user authentication.

Hashed passwords with Bcrypt for secure storage.

Token verification and authorization for protected routes.

Input validation and sanitization to prevent injection attacks.

Environment variables for sensitive data.

# Setup

## Prerequisites

Node.js (https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

MongoDB (https://www.mongodb.com/docs/manual/installation/)

## Installation

## Clone the repository:

git clone https://github.com/vishusrivastva/chat_app_vishwajeet.git

## Navigate to the project directory:
  
cd chat_app_vishwajeet

## Install server dependencies:

  cd backend
  
  npm install

## Install client dependencies:

  cd ../frontend
  
  npm install

## Running the Application

## Start the server:


  cd ../backend
  
  npm start

## Start the client:

  cd ../frontend

  npm start

Open your browser and navigate to http://localhost:3000.

# Usage

Register: Create a new account.

Login: Use your credentials to log in.

Chat: Join chat rooms, send text and image messages, and view messages from other users.

Logout: Terminate your session.

# Architecture

## Frontend

React: Builds the user interface.

React Router: Manages navigation between login, registration, and chat pages.

Axios: Handles HTTP requests to the backend.

Socket.io-client: Facilitates real-time communication with the server.

## Backend

Node.js and Express: Creates a REST API and handles HTTP requests.

MongoDB: Stores user and chat data.

Mongoose: Provides an ODM (Object Data Modeling) layer for MongoDB.

Socket.io: Enables real-time communication between the server and clients.

JWT: Generates and verifies tokens for secure authentication.

## Security Considerations

The application addresses several security concerns:

Authentication: JWTs are employed for secure user authentication, involving signing with a secret key and verification on access to protected routes.

Password Storage: Passwords are hashed before storing them in the database, preventing plaintext storage.

Authorization: Middleware protects routes based on token validity (authenticateToken).

Data Validation: Ensures proper data format and sanitizes input to thwart injection attacks.

Environment Variables: Sensitive data like JWT secrets and database URIs reside in environment variables, not directly in the code.

# API Endpoints

## Authentication

POST /api/auth/register: Registers a new user.

Request: { "username": "example", "email": "example@example.com", "password": "password123" }

Response: { "message": "User registered successfully" }

POST /api/auth/login: Logs in a user.

Request: { "email": "example@example.com", "password": "password123" }

Response: { "token": "jwt_token", "user": { "id": "user_id", "username": "example", "email": "example@example.com" } }

## Chat

GET /api/chat/messages/:roomId: Retrieves chat messages for a room.

Headers: { "Authorization": "Bearer jwt_token" }

Response: Array of message objects with sender, textContent, timestamp fields.

POST /api/chat/message: Sends a chat message.

Headers: { "Authorization": "Bearer jwt_token" }

Request: { "roomId": "room1", "textContent": "Hello!", "userId": "user_id" }

Response: { "message": "Message sent successfully" }


## Additional Notes

Ensure your MongoDB instance is running before starting the server.

The server listens on port 5000 and the React development server listens on port 3000 by default.

Customize the .env file as per your development and production environments.


## Future Improvements

Add more detailed user profile features.

Implement direct messaging between users.

Enhance the user interface with more features and better design.

Implement more robust error handling and logging mechanisms.
