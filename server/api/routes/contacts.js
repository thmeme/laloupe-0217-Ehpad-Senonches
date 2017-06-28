import express from 'express';
import Contact from '../models/contact.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var contact = new Contact();

  router.get('/', contact.findAllByUser);

  router.get('/:id', contact.findById);

  router.put('/admin/:id', Auth.isAdministrator, contact.update);
  router.put('/:id', Auth.hasAuthorization, contact.updateByUser);

  app.use('/contact', router);
};
