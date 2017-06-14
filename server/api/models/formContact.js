import mongoose from 'mongoose';
import formContact from './formContact.js';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';


var mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "test.node.wcs@gmail.com",
    pass: "jordan41200"
  }
});

var options = {
  viewEngine: {
      extname: '.hbs',
      layoutsDir: './views/email/',
      defaultLayout : 'template',
      partialsDir : './views/partials/'
  },
  viewPath: './views/email/',
  extName: '.hbs'
};



export default class ContactForm {

  sendMail(req, res) {

    mailer.use('compile', hbs(options));
  mailer.sendMail({
    from: 'test@test.com',
    to: 'jordan.couard@gmail.com',
    subject: 'form.sujet',
    template: 'email_body',
    context: {
         variable1 : formContact.name,
         variable2 : formContact.message
    }
  }, function (error, response) {
    console.log('mail send at');
    mailer.close();
  });

  }
}
