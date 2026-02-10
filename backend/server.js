const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prashant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/friends', require('./routes/friends'));

// Socket.io connection
const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('user-online', (userId) => {
    connectedUsers[userId] = socket.id;
    io.emit('users-online', Object.keys(connectedUsers));
  });

  socket.on('send-message', (data) => {
    io.to(connectedUsers[data.receiverId]).emit('receive-message', {
      sender: data.senderId,
      message: data.message,
      timestamp: new Date()
    });
  });

  socket.on('send-group-message', (data) => {
    io.emit('receive-group-message', {
      sender: data.senderId,
      senderName: data.senderName,
      message: data.message,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    Object.keys(connectedUsers).forEach(userId => {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
      }
    });
    io.emit('users-online', Object.keys(connectedUsers));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
