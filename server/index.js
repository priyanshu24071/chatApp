// server/index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
// --- Express/Socket.IO ---

// config
const CLIENT_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const io = new Server(server, {
  cors: {
    origin: [CLIENT_ORIGIN, 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
});


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chatapp';

// db connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('[mongo] connected'))
  .catch((err) => {
    console.error('[mongo] connection error:', err);
    process.exit(1);
  });

const MessageSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    text:     { type: String, required: true },
    timestamp:{ type: Number, required: true, index: true }
  },
  { versionKey: false, collection: 'messages' }
);

const Message = mongoose.model('Message', MessageSchema);





// Tracking users connected
const users = new Map();

// Helper: fetch last 10 messages (older to nwer)
async function fetchLastTen() {
  const docs = await Message.find({}).sort({ timestamp: -1 }).limit(10).lean();
  return docs.reverse();
}

io.on('connection', (socket) => {
  console.log('[io] connected:', socket.id);

  // join(userName required)
  socket.on('join', async (userName) => {
    try {
      if (typeof userName !== 'string' || !userName.trim()) return;
      const cleanName = userName.trim();

      users.set(socket.id, cleanName);
      socket.data.userName = cleanName;

      // show last 10 messages to the new user
      const history = await fetchLastTen();
      socket.emit('history', history);

      //broadcastt
      io.emit('users', Array.from(users.values()));
      console.log(`[io] ${cleanName} joined`);
    } catch (err) {
      console.error('[io] join error:', err);
    }
  });

  // message({ userName, text })
  socket.on('message', async (payload) => {
    try {
      const { userName, text } = payload || {};
      const effectiveUser = String(userName || socket.data.userName || 'Anonymous');
      const cleanText = String(text || '').trim();
      if (!cleanText) return;

      const msg = {
        userName: effectiveUser,
        text: cleanText.slice(0, 2000),
        timestamp: Date.now()
      };

      // store to DB
      await Message.create(msg);

      // Broadcast to all
      io.emit('message', msg);
    } catch (err) {
      console.error('[io] message error:', err);
    }
  });

  socket.on('disconnect', () => {
    const name = users.get(socket.id);
    users.delete(socket.id);
    io.emit('users', Array.from(users.values()));
    console.log('[io] disconnected:', socket.id, name ? `(${name})` : '');
  });
});

// Simple health check
app.get('/', async (_req, res) => {
  const count = await Message.estimatedDocumentCount().catch(() => 0);
  res.send(`Chat server is running. Messages in DB: ${count}`);
});

server.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
  console.log(`[server] CORS origin: ${CLIENT_ORIGIN}`);
});
