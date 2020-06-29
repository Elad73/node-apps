const sgMail = require('@sendgrid/mail');
const keys   = require('../../config/keys');

const sendgridAPIKey = keys.sendGridKey;
sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
   to: 'elad.ron.g@gmail.com' ,
   from: 'elad.ron.g@gmail.com',
   subject: 'This is my first creation!',
   text: 'I hope this one actually get to you.'
});