// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB(process.env.MONGO_URI);

// CORS (allow all origins)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.options("*", cors());

// Parse JSON body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/user-details', require('./routes/UserDetails'));
app.use("/api/visited-templates",require("./routes/VisitedTemplates"));

// Default route
app.get('/', (req, res) => res.send('Auth server running'));

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ msg: 'Something went wrong' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
