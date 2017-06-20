import express from 'express';
import Mail from '../models/mailer.js';

let router = express.Router();

module.exports = (app) => {

  var mail = new Mail();

  router.post('/sendall', mail.sendMail);

  app.use('/mailer', router);
};
