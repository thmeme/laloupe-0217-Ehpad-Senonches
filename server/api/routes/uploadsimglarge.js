import express from 'express';
import Auth from '../middlewares/authorization.js';
import Imgl from '../libs/imagelargeUpload.js';

let router = express.Router();

module.exports = (app) => {

  let imgl = new Imgl();

  router.post('/imagel/', imgl.create);

  router.get('/', imgl.getAll);

  app.use('/uploadimglarge', Auth.hasAuthorization, router);
};
