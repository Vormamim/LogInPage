const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Read users from JSON
const getUsers = () => {
  const data = fs.readFileSync('users.json');
  return JSON.parse(data);
};

// Save users to JSON
const saveUsers = (users) => {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Username and password must be strings.' });
  }
  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ message: 'Username must be at least 3 characters and password at least 6 characters.' });
  }

  const users = getUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  saveUsers(users);
  res.json({ message: 'Registration successful' });
});

// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Username and password must be strings.' });
  }

  const users = getUsers();
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Get all users (for display)
app.get('/api/users', (req, res) => {
  const users = getUsers();
  const safeUsers = users.map(u => ({ username: u.username }));
  res.json(safeUsers);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
