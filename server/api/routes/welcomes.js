import express from 'express';
import Welcome from '../models/welcome.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var welcome = new Welcome();

  router.get('/', welcome.findAllByUser);

  router.get('/:id', welcome.findById);

  router.put('/admin/:id', Auth.isAdministrator, welcome.update);
  router.put('/:id', Auth.hasAuthorization, welcome.updateByUser);

  app.use('/welcome', router);
};
