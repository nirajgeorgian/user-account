const fs = require('fs');
const Mailgen = require('mailgen');

// configure the mailgen theme and info
const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'OoOO',
    link: 'http://www.nirajgeorgian.me'
  }
})

// next generate the emails
const email = {
  body: {
    name: 'Niraj Georgian',
    intro: 'Welcome to online open source blog build on top of react and express',
    action: {
      instructions: 'To get started with OoOO blogging platform , Please click here',
      button: {
        color: '#22BC66',
        text: 'Confirm your account',
        link: 'http://www.nirajgeorgian.me'
      }
    },
    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
  }
}

// generate the email body
const emailBody = mailGenerator.generate(email);

const emailText = mailGenerator.generatePlaintext(email);
fs.writeFileSync('preview.html', emailBody, 'utf-8');
fs.writeFileSync('preview_plain.html', emailBody, 'utf-8');
