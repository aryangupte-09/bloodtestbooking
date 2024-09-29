const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.post('/sendConfirmationEmail', (req, res) => {
  const { email, name } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'your-smtp-server.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'your-email-address',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: 'your-email-address',
    to: email,
    subject: 'Welcome to Redcell Laboratories',
    text: `Hello ${name} and welcome to Redcell Laboratories.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully!');
  });
});