import express from 'express';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';


var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: './api/views/email',
    defaultLayout: 'template',
    partialsDir: './api/views/partials/'
  },
  viewPath: './api/views/email',
  extName: '.hbs'
};

var mailer = nodemailer.createTransport({
  host: 'gmail',
  auth: {
    user: 'test.node.wcs@gmail.com',
    pass: 'jecode4laloupe'
  }
});

// send mail with defined transport object
function sendMail(req, res) {
  mailer.use('compile', hbs(options));
  mailer.sendMail({
    from: 'test.node.wcs@gmail.com',
    to: 'jordan.couard@gmail.com',
    subject: req.body.subject,
    template: 'email_body',
    context: {
      variable1: req.body.message
    }
  }, function(error, response) {
    if (error) {
      console.log(error);
      // res.sendStatus(500).send(error.message);
    } else {
      console.log('mail send');
      // res.sendStatus(200);
    }
  });
  mailer.close();
}




let router = express.Router();

module.exports = (app) => {

  router.post('/mailer', sendMail);

  app.use('/', router);
};
