const sgMail = require('@sendgrid/mail');
const keys   = require('../../config/keys');

const sendgridAPIKey = keys.sendGridKey;
sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'elad.ron.g@gmail.com',
        subject: 'Thanks for joinging in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
};

const sendDeleteUserEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'elad.ron.g@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Thanks for the time and the opportunity, ${name}. Let me know how did you get along with the app, or if you have any feedback.`
    })
};

module.exports = {
    sendWelcomeEmail,
    sendDeleteUserEmail
}