Chat Application
Overview
This chat application allows users to register, login, and participate in real-time chat rooms. 
It uses React for the frontend, Node.js and Express for the backend, MongoDB for the database, and Socket.io for real-time communication.

Setup Instructions
Prerequisites
  Node.js
  MongoDB
Installation
  Clone the repository
    [git clone https://github.com/vishusrivastva/chat_app_vishwajeet.git](https://github.com/vishusrivastva/chat_app_vishwajeet.git)
    cd chat_app_vishwajeet
  Install server dependencies
    cd backend
    npm install
  Install client dependencies
    cd ../frontend
    npm install
  Run the server
    cd ../backend
    npm start
  Run the client
    cd ../frontend
    npm start
  Open your browser and navigate to http://localhost:3000.

Usage
Register: Create a new account.
Login: Use your credentials to log in.
Chat: Start sending messages in the chat room. You can send text messages and images.
Logout: Click the logout button to end your session.

Architecture
  Frontend
    React: Used for building the user interface.
    React Router: Manages navigation between login, registration, and chat pages.
    Axios: Handles HTTP requests to the backend.
    Socket.io-client: Manages real-time communication with the server.
  Backend
    Node.js and Express: Serve the REST API and handle HTTP requests.
    MongoDB: Database to store user information.
    Mongoose: ORM for MongoDB.
    Socket.io: Manages real-time communication between the server and clients.
    JWT (JSON Web Token): Used for secure user authentication.
    
Security Concerns Addressed
  Authentication:
    JWT: Tokens are generated and signed using a secret key. The tokens are verified for authenticity before allowing access to protected routes.
  Password Storage:
    Bcrypt: Passwords are hashed before storing them in the database to prevent plaintext storage of passwords.
  Authorization:
    Middleware (authenticateToken) is used to verify tokens on protected routes.
  Data Validation:
    Input validation ensures that the data received is in the expected format and sanitizes the input to prevent injection attacks.
  Environment Variables:
    Sensitive information like JWT secret keys and database URIs are stored in environment variables and not hard-coded into the source code.
    
API Endpoints
  Authentication
    POST /api/auth/register: Register a new user.
      Request: { "username": "example", "email": "example@example.com", "password": "password123" }
      Response: { "message": "User registered successfully" }
    POST /api/auth/login: Login a user.
      Request: { "email": "example@example.com", "password": "password123" }
      Response: { "token": "jwt_token", "user": { "id": "user_id", "username": "example", "email": "example@example.com" } }
  Chat
    GET /api/chat/messages/: Fetch chat messages for a room.
      Headers: { "Authorization": "Bearer jwt_token" }
      Response: [ { "sender": "username", "textContent": "Hello!", "timestamp": "2024-06-10T12:34:56.789Z" }, ... ]
    POST /api/chat/message: Send a chat message.
      Headers: { "Authorization": "Bearer jwt_token" }
      Request: { "roomId": "room1", "textContent": "Hello!", "userId": "user_id" }
      Response: { "message": "Message sent successfully" }
      
Additional Notes
  Ensure your MongoDB instance is running before starting the server.
  The server listens on port 5000 and the React development server listens on port 3000 by default.
  Customize the .env file as per your development and production environments.
Future Improvements
  Add more detailed user profile features.
  Implement direct messaging between users.
  Enhance the user interface with more features and better design.
  Implement more robust error handling and logging mechanisms.
