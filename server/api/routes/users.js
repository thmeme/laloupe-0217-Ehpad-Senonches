import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
    res.sendStatus(200);
  });

  var user = new User();

  app.post('/login', user.connect);

  router.get('/', user.findAll);

  router.get('/:id', user.findById);

  router.post('/', user.create);

  router.put('/:id', user.update);

  router.delete('/:id', user.delete);

  app.use('/users', Auth.isAdministrator, router);

};
