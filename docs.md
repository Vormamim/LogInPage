To make this work, I've used a thing called Node.js, which is a JavaScript runtime that allows you to run JavaScript on the server side. I've also used Express, a web framework for Node.js, to handle HTTP requests and responses.

# Simple User Registration and Login System
This is a simple user registration and login system built with Node.js and Express. It allows users to register with a username and password, and then log in with those credentials. The passwords are securely hashed using bcrypt.

### to install

npm init -y
npm install express body-parser

### to run
node server.js

Open your browser to: http://localhost:3000

### To stop the server, press:
Ctrl + C
in the terminal where the server is running.

### Security Hashing

Hashing is a one-way process that transforms data (like a password) into a fixed-length string of characters, which appears random. When a user registers, their password is hashed (using a library like bcrypt) before being stored. This means the actual password is never saved—only the hash.

When a user logs in, the password they enter is hashed again and compared to the stored hash. If the hashes match, the password is correct.

Why use hashing?

- Even if someone gets access to your database, they cannot see users’ real passwords.
- Hashing protects user data and improves security.

bcrypt is a popular hashing library because it is slow and uses a unique salt for each password, making it much harder for attackers to crack passwords using brute force or precomputed tables.

npm install bcrypt

users.html Explanation
This HTML file displays a list of registered users. It works as follows:

When the page loads, it sends a request to the backend endpoint /api/users to get the list of users.
The backend responds with a JSON array of user objects (each containing a username).
The JavaScript code loops through each user and creates a list item (<li>) showing the username.

All usernames are displayed in an unordered list (<ul>).

### Note:
For security, only usernames are shown—passwords are never sent to or displayed on the frontend.

## Validation
Registration Validation (/register)
Checks if both username and password are provided:
If either is missing, it returns a 400 error with the message "Username and password are required."

### Checks if both fields are strings:
If not, it returns a 400 error with the message "Username and password must be strings."

### Checks minimum length:

Username must be at least 3 characters.
Password must be at least 6 characters.
If not, it returns a 400 error with the message "Username must be at least 3 characters and password at least 6 characters."
Checks for duplicate usernames:
If the username already exists, it returns a 400 error with the message "Username already exists."

### If all checks pass:

The password is hashed using bcrypt.
The new user is saved to users.json.
Responds with "Registration successful."

### Login Validation (/login)
Checks if both username and password are provided:
If either is missing, it returns a 400 error with the message "Username and password are required."

Checks if both fields are strings:
If not, it returns a 400 error with the message "Username and password must be strings."

### Checks credentials:

Looks up the user by username.
Compares the provided password with the hashed password using bcrypt.
If valid, responds with "Login successful."
If invalid, responds with a 401 error and "Invalid username or password."

### Summary:
These validations help ensure that only properly formatted and unique usernames are registered, and that only users with correct credentials can log in. This improves both security and user experience.