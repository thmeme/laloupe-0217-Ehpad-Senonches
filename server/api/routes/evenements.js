import express from 'express';
import Evenement from '../models/evenement.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
      res.sendStatus(200);
  });

    var evenement = new Evenement();

    // router.get('/:id', Auth.hasAuthorization, evenement.findById);

    router.get('/', Auth.hasAuthorization, evenement.findAll);

    router.post('/', Auth.hasAuthorization, evenement.create);

    // router.put('/:id', Auth.hasAuthorization, evenement.update);

    // router.delete('/:id', Auth.isAdministrator, evenement.delete);

    app.use('/evenements', router);
};
