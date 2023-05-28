const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')

// Home route
router.get('/', (req, res) => {
  res.render('index', { errorMessage: null, successMessage: null });
});

router.post('/send', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    console.log(`email: ${email}\n`);
    // output for our message
    const output = `
      <h2>You have a new contact request</h2>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Subject: ${subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 2525,
      service: 'gmail',
      auth: {
        user: `${process.env.User}`,
        pass: `${process.env.Password}`
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"The Website" <no-reply@arstsmog.com>', // sender address
      to: `${process.env.User}`,
      subject: 'Test Message', // Subject line
      text: 'You have a message from the website!', // plain text body
      html: output // html body
    };
  
    // send mail with defined transport object
    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            const errorMessage = 'There was a problem sending your email!';
            console.log(errorMessage)
            res.send(errorMessage);
          } else {
            const successMessage = 'Your message has been sent. Thank you!';
            console.log(successMessage);
            res.render('index', successMessage);
          }
        });
    });

module.exports = router;