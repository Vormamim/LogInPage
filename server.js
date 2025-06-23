const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
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
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  users.push({ username, password });
  saveUsers(users);
  res.json({ message: 'Registration successful' });
});

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
