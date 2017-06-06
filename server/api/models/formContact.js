import mongoose from 'mongoose';
import formContact from './formContact.js';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const formSchema = new mongoose.Schema({
  mail: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  subject: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  }
});

let model = mongoose.model('formContact', formSchema);


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
    from: formContact.mail,
    to: 'jordan.couard@gmail.com',
    subject: formContact.subject,
    template: 'email_body',
    context: {
         variable1 : formContact.name,
         variable2 : formContact.message
    }
  }, function (error, response) {
    console.log('mail send at' + to);
    mailer.close();
  });
  }
}
