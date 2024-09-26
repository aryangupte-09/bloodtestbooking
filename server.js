const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// MongoDB connection
mongoose.connect('mongodb+srv://aryan9oct:Aryan%400910@cluster0.cm9bc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Registration route
app.post('/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    console.log('New user created:', newUser);

    await newUser.save();
    // Redirect to the login page after registration
    res.redirect('/login.html'); // Adjusted to correct path
  } catch (err) {
    console.error('Error registering user:', err);
    res.send('Error registering user.');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.send('No user found with that email');
    } else {
      const isValidPassword = await bcrypt.compare(password, foundUser.password);
      if (isValidPassword) {
        // Serve the home.html from the 'home' folder within 'public'
        res.sendFile(path.join(__dirname, 'public/home/home.html'));
      } else {
        res.send('Incorrect password');
      }
    }
  } catch (err) {
    console.error(err);
    res.send('Error logging in');
  }
});

// Serve register.html file
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register/register.html')); // Serve the register.html file
});

// Serve login.html file
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login/login.html')); // Serve the login.html file
});

// Listen on port 3003
app.listen(3004, () => {
  console.log('Server started on port 3004');
});