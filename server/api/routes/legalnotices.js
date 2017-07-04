import express from 'express';
import Legalnotice from '../models/legalnotice.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var legalnotice = new Legalnotice();

  router.get('/', legalnotice.findAllByUser);
  router.get('/:id', legalnotice.findById);

  router.put('/admin/:id', Auth.isAdministrator, legalnotice.update);
  router.put('/:id', Auth.hasAuthorization, legalnotice.updateByUser);

  app.use('/legalnotice', router);
};
