# Real-Time App

A real-time chat application built with **Node.js, Express, MongoDB, TypeScript, and Socket.IO**.

##Features

* User Registration & Login
* JWT Authentication
* Real-time messaging with Socket.IO
* Real-time online/offline user status
* Chat rooms
* Public and private rooms
* Room membership validation
* Typing indicators
* Message history
* Centralized API error handling

## 🛠️ Technologies

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Socket.IO
* JWT
* Bcrypt

## 📁 Project Structure

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── socket/
├── utils/
└── server.ts
```

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project:

```bash
cd real-time-app
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT__SECRET=your_jwt_secret
```

Start the development server:

```bash
npm run dev
```

## 🔌 Socket.IO

Socket.IO is separated into its own module to keep the real-time functionality organized and separate from the main Express server.

The Socket.IO module handles:

* Authentication
* Joining rooms
* Sending messages
* Typing indicators
* Online/offline status
* Room access control

## 🔐 Authentication

The application uses **JWT** for authentication.

Users can:

* Register
* Login
* Authenticate Socket.IO connections using a JWT token

## 💬 Real-Time Messaging

Users can join rooms and send messages in real time.

Messages are stored in MongoDB and broadcast to users connected to the same room.

## 🏠 Rooms

The application supports:

* Public rooms
* Private rooms
* Room membership validation
* Room message history

## 👨‍💻 Author

Mohamed Ahmed

GitHub: https://github.com/mohamedahmed167
