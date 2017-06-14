import express from 'express';
import ContactForm from '../models/formContact.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
      res.sendStatus(200);
  });

    var contactForm = new ContactForm();

    router.get('/', contactForm.sendMail);


    app.use('/contactForm', router);
};
