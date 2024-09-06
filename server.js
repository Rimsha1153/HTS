const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set up Nodemailer transport

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'htstechnicalservices902@gmail.com',
        pass: '123456@Hts', // it's `pass` not `password`
    },
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Form submission route
app.post('/submit', (req, res) => {
    const { name, phone, email, message } = req.body;

    const mailOptions = {
        from: 'htstechnicalservices902@gmail.com',
        to: 'htstechnicalservices902@gmail.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            return res.send('Form submitted successfully and email sent');
        }
    });
});

const PORT = process.env.PORT || 5502; // Make sure this matches your URL port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


