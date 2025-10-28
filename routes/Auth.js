// routes/Auth.js
const express = require('express');
const router = express.Router();

// Dummy login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', req.body);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  // Simulate successful login
  if (email === "test@example.com" && password === "123456") {
    return res.status(200).json({
      token: "mock-token-123",
      user: { id: 1, name: "Test User", email }
    });
  }

  return res.status(400).json({ message: 'Invalid credentials' });
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  res.status(201).json({
    user: { id: 1, name, email },
    message: "Registered successfully"
  });
});

module.exports = router;
