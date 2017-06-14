import express from 'express';
import Auth from '../middlewares/authorization.js';
import Imglarge from '../libs/imagelargeUpload.js';

let router = express.Router();

module.exports = (app) => {

  let imglarge = new Imglarge();

  router.post('/imglarge/', Auth.hasAuthorization, imglarge.create);

  router.get('/', Auth.hasAuthorization, imglarge.getAll);

  app.use('/uploadimglarge', router);
};
