# Real-Time Chat Application

A backend-focused real-time chat application built with **Node.js, Express.js, TypeScript, MongoDB, and Socket.IO**.

The project provides authenticated real-time communication, room-based messaging, private room access control, online user tracking, and typing indicators.

## ✨ Key Features

* 🔐 **JWT Authentication**

  * User registration and login
  * Password hashing with Bcrypt
  * JWT-based authentication for HTTP and Socket.IO connections

* 💬 **Real-Time Messaging**

  * Instant message delivery using Socket.IO
  * Persistent message storage in MongoDB
  * Messages populated with user information

* 🏠 **Room Management**

  * Create and retrieve chat rooms
  * Support for public and private rooms
  * Private room membership validation
  * Retrieve room message history

* 🟢 **Online Presence**

  * Track connected users
  * Real-time online/offline status updates

* ✍️ **Typing Indicators**

  * Notify room members when a user starts or stops typing

* 🛡️ **Error Handling**

  * Centralized API error handling
  * Custom `ApiError` class
  * Consistent HTTP error responses

## 🛠️ Tech Stack

| Technology | Purpose                 |
| ---------- | ----------------------- |
| Node.js    | Backend runtime         |
| Express.js | REST API                |
| TypeScript | Type-safe development   |
| MongoDB    | Database                |
| Mongoose   | MongoDB ODM             |
| Socket.IO  | Real-time communication |
| JWT        | Authentication          |
| Bcrypt     | Password hashing        |

## 🏗️ Architecture

The application separates the REST API layer from the real-time communication layer.

```text
Client
  │
  ├────────────── HTTP ──────────────┐
  │                                  │
  ▼                                  ▼
Express.js                       Socket.IO
  │                                  │
  ├── Routes                          ├── Authentication
  │                                  ├── Room Management
  ├── Controllers                     ├── Messaging
  │                                  ├── Typing Events
  └── Error Handler                   └── Online Presence
  │                                  │
  └───────────────┬──────────────────┘
                  ▼
              MongoDB
```

Socket.IO is implemented in a dedicated module instead of being mixed with the main Express server setup.

## 📂 Project Structure

```text
src/
├── config/
│   └── db.ts
│
├── controllers/
│   ├── user.controller.ts
│   └── room.controller.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   └── apiError.middlewars.ts
│
├── models/
│   ├── user.model.ts
│   ├── room.model.ts
│   └── message.model.ts
│
├── routes/
│   ├── user.route.ts
│   └── room.routes.ts
│
├── socket/
│   └── socket.ts
│
├── utils/
│   └── ApiError.ts
│
└── server.ts
```

## 🔐 Authentication Flow

HTTP requests and Socket.IO connections are authenticated using JWT.

```text
User Login
    ↓
JWT Token
    ↓
HTTP Request / Socket.IO Connection
    ↓
JWT Verification
    ↓
User Identification
    ↓
Authorized Access
```

For Socket.IO connections, the token is received during the handshake and verified before allowing the user to access real-time functionality.

## 💬 Real-Time Communication

The application uses Socket.IO events to handle real-time interactions.

### Main Events

| Event          | Description                           |
| -------------- | ------------------------------------- |
| `join-room`    | Join an authorized chat room          |
| `send-message` | Send a message to a room              |
| `typing-start` | Notify users that someone is typing   |
| `typing-stop`  | Notify users that typing has stopped  |
| `user-online`  | Notify users when someone connects    |
| `user-offline` | Notify users when someone disconnects |
| `new-message`  | Broadcast a newly created message     |

## 🏠 Private Room Access

Private rooms verify the authenticated user's membership before allowing them to join.

```text
User requests to join room
          ↓
      Find Room
          ↓
    Is room private?
       ↙       ↘
     No         Yes
     ↓           ↓
   Join      Check Membership
                 ↓
           ┌─────┴─────┐
         Member      Not Member
           ↓              ↓
         Join           Reject
```

## 📡 API Endpoints

### Authentication

```text
POST /api/register
POST /api/login
```

### Rooms

```text
POST /api/rooms
GET  /api/rooms
GET  /api/rooms/:id
GET  /api/rooms/:roomId/messages
```

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT__SECRET=your_jwt_secret
```

> Never commit your `.env` file to GitHub.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create the `.env` file and add the required variables.

### 4. Start the development server

```bash
npm run dev
```

The server will start on:

```text
http://localhost:5000
```

## 🎯 Project Goals

This project was built to practice and demonstrate:

* Building RESTful APIs with Express.js
* Type-safe backend development with TypeScript
* MongoDB data modeling with Mongoose
* JWT authentication
* Real-time communication with Socket.IO
* Room-based communication
* Event-driven backend architecture
* Middleware and centralized error handling
* Structuring a scalable Node.js backend

## 👨‍💻 Author

**Mohamed Ahmed**

Computer Science Graduate | Junior MERN Stack Developer

* GitHub: https://github.com/mohamedahmed167
