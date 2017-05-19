import express from 'express';
import Auth from '../middlewares/authorization.js';
import Image from '../libs/imageUpload.js';

let router = express.Router();

module.exports = (app) => {

  let image = new Image();

  router.post('/image/', Auth.hasAuthorization, image.create);

  router.get('/', Auth.hasAuthorization, image.getAll);

  app.use('/upload', router);
};
