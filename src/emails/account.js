const sgMail = require("@sendgrid/mail");
require("dotenv").config();

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "noreply@ankitkamboj.in", // Change to your verified sender
    subject: "Thanks for joining in " + name,
    text: `Welcome to the app, ${name}. Let me know how you get along with app.`,
    html: "<strong>Task App your friend online!</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent!");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendCancellationEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "noreply@ankitkamboj.in", // Change to your verified sender
    subject: "Goodbye " + name,
    text: `We are sad to see you go, ${name}. Is there anything we could have done to kept you onboard.`,
    html: "<strong>Task App your friend online!</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Cancellation email sent!");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
