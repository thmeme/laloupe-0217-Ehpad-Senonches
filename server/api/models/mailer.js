import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';


var mailer = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD_MAIL
  }
});
var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: '../server/api/views/email/',
    defaultLayout: 'template',
    partialsDir: '../server/api/views/partials/'
  },
  viewPath: '../server/api/views/email/',
  extName: '.hbs'
};

export default class Mail {

  sendMail(req, res) {
    console.log(req.body);
    mailer.use('compile', hbs(options));
    mailer.sendMail({
      from: process.env.USER_MAIL,
      to: process.env.SENDTO,
      subject: req.body.subject,
      template: 'email_body',
      context: {
        variable1: req.body.email,
        variable2: req.body.name,
        variable3: req.body.message
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log('mail send');
        res.sendStatus(200);
      }
    });
    mailer.close();
  }
}
