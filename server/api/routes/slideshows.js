import express from 'express';
import Slideshow from '../models/slideshow.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var slideshow = new Slideshow();

  router.get('/:id', Auth.hasAuthorization, slideshow.findById);

  router.get('/', slideshow.findAll);

  router.post('/admin/', Auth.isAdministrator, slideshow.create);
  router.post('/', Auth.hasAuthorization, slideshow.createByUser);

  router.put('/admin/', Auth.isAdministrator, slideshow.update);
  router.put('/', Auth.hasAuthorization, slideshow.updateByUser);

  router.delete('/:id', Auth.isAdministrator, slideshow.delete);

  app.use('/slideshow', router);
};
