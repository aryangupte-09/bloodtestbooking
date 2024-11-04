//Auto mail
const nodemailer = require('nodemailer');

// Configure transporter (you'll need to replace with your email service's settings)
const transporter = nodemailer.createTransport({
  service: 'Gmail',  // or any email service you're using (Gmail, Outlook, etc.)
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,  // Increase connection timeout to 10 seconds
});

// Function to send email
function sendWelcomeEmail(toEmail) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: toEmail,
    subject: 'Welcome to Red Cell Laboratories',
    text: `
      Welcome to Red Cell Laboratories!

      Explore our wide range of comprehensive lab tests with 100% guaranteed accuracy. Whether you’re in need of routine health checks, specialized diagnostics, or advanced medical testing, we’ve got you covered.

      Here are some services we offer:
      - Comprehensive Blood Panels
      - Hormone & Metabolic Testing
      - Genetic & Pathology Services
      - Preventive Health Checkups

      Stay healthy with timely reports and expert advice. 

      Thank you for choosing Red Cell Laboratories.
      - The Red Cell Labs Team
    `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error sending mail:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

//DB Logic
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
mongoose.connect('mongodb+srv://aryan9oct:Aryan%400910@cluster0.cm9bc.mongodb.net/?retryWrites=true&w=majority')
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
    res.redirect('/login.html');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Error registering user.');
  }
});

// Login route
// Login route
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Log received form data
  console.log('Email:', email);
  console.log('Password:', password);

  // Check if both fields are filled
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).send('No user found with that email');
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);
    if (!isValidPassword) {
      return res.status(401).send('Incorrect password');
    }

    // User is authenticated, proceed to send welcome email
    if (foundUser.email) {
      sendWelcomeEmail(foundUser.email);  // Send welcome email
      console.log('Welcome email sent to:', foundUser.email);
      return res.sendFile(path.join(__dirname, 'public/home/home.html'));  // Send the user to the home page
    } else {
      return res.status(400).send('No email ID found.');
    }

  } catch (err) {
    console.error('Error logging in:', err);
    return res.status(500).send('Error logging in');
  }
});
// app.post('/login', async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   // Log received form data
//   console.log('Email:', email);
//   console.log('Password:', password);

//   // Check if both fields are filled
//   if (!email || !password) {
//     return res.status(400).send('Email and password are required');
//   }

//   try {
//     const foundUser = await User.findOne({ email: email });
//     if (!foundUser) {
//       return res.status(404).send('No user found with that email');
//     } else {
//       const isValidPassword = await bcrypt.compare(password, foundUser.password);
//       if (isValidPassword) {
//         return res.sendFile(path.join(__dirname, 'public/home/home.html'));
//       } else {
//         return res.status(401).send('Incorrect password');
//       }
//     }
//   } catch (err) {
//     console.error('Error logging in:', err);
//     return res.status(500).send('Error logging in');
//   }
  
// });



// Serve register.html file
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register/register.html'));
});

// Serve login.html file
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login/login.html'));
});

// Listen on port 3005
app.listen(3005, () => {
  console.log('Server started on port 3005');
});