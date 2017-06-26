import express from 'express';
import Welcome from '../models/welcome.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var welcome = new Welcome();

  router.get('/', Auth.hasAuthorization, welcome.findAllByUser);
  router.get('/anon', welcome.findAllAnon);
  router.get('/admin', Auth.isAdministrator, welcome.findAll);
  router.get('/:id', welcome.findById);


  router.post('/admin/', Auth.isAdministrator, welcome.create);
  router.post('/', Auth.hasAuthorization, welcome.createByUser);

  router.put('/admin/:id', Auth.isAdministrator, welcome.update);
  router.put('/:id', Auth.hasAuthorization, welcome.updateByUser);

  router.delete('/:id', Auth.isAdministrator, welcome.delete);

  app.use('/welcome', router);
};
