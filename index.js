// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB(process.env.MONGO_URI);

// middlewares
app.use(cors({
  origin: ["0.0.0.0/0"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); // allow cross-origin requests (adjust origin in production)
app.use(express.json()); // parse JSON

// routes
app.use('/api/auth', require('./routes/Auth'));

// root
app.get('/', (req, res) => res.send('Auth server running'));

// error handling (basic)
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ msg: 'Something went wrong' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
