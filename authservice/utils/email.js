const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `App <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

 
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

    // Send the actual email
    async send(template, subject) {
      // 1) Render HTML based on a pug template
      const html = pug.renderFile(`${__dirname}../../views/email/${template}.pug`, {
        firstName: this.firstName,
        url: this.url,
        message: this.message,
        email: this.email,
      });
  
      
  
      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        message: this.message,
        subject,
        html,
        text: htmlToText.fromString(html)
      };
  
      // 3) Create a transport and send email
      await this.newTransport().sendMail(mailOptions, (error, result) => {
        if (error) return console.error(error);
        return console.log(result);
      });
    }
  
  
    // Send self mail with contact form
    async sendSelf(template, subject) {
      // 1) Render HTML based on a pug template
      const html = pug.renderFile(`${__dirname}../../views/email/${template}.pug`, {
        firstName: this.firstName,
        url: this.url,
        message: this.message,
        subjectC: this.subject,
        email: this.email,
      });
  
      
  
      // 2) Define email options
      const mailOptions = {
        from: this.to,
        to: this.from,
        message: this.message,
        subject: this.subjectC,
        html,
        text: htmlToText.fromString(html)
      };
  
      // 3) Create a transport and send email
      await this.newTransport().sendMail(mailOptions);
    }
  
    async sendWelcome() {
      await this.send('welcome', `Welcome to the Family!`);
    }
    async confirmInscription() {
      await this.send('confirmInscription', 'Your account verification!');
    }
  
    async sendPasswordReset() {
      await this.send(
        'passwordReset',
        'Your password reset token'
      );
    }
};
