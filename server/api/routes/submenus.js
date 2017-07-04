import express from 'express';
import Submenu from '../models/submenu.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var submenu = new Submenu();

  router.get('/anon', submenu.findAllAnon);
  router.get('/:id', submenu.findById);
  router.get('/admin', Auth.isAdministrator, submenu.findAll);
  router.get('/', Auth.hasAuthorization, submenu.findAllByUser);


  router.post('/admin/', Auth.isAdministrator, submenu.create);
  router.post('/', Auth.hasAuthorization, submenu.createByUser);

  router.put('/admin/:id', Auth.isAdministrator, submenu.update);
  router.put('/:id', Auth.hasAuthorization, submenu.updateByUser);

  router.delete('/:id', Auth.isAdministrator, submenu.delete);

  app.use('/submenus', router);
};
