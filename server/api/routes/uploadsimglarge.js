import express from 'express';
import Auth from '../middlewares/authorization.js';
import Imgl from '../libs/imagelargeUpload.js';

let router = express.Router();

module.exports = (app) => {

  let imgl = new Imgl();

  router.post('/imagel/', Auth.hasAuthorization, imgl.create);

  router.get('/', Auth.hasAuthorization, imgl.getAll);

  app.use('/uploadimglarge', router);
};
