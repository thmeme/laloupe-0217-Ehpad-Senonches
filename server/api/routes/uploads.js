import express from 'express';
import Auth from '../middlewares/authorization.js';
import Image from '../libs/imageUpload.js';

let router = express.Router();

module.exports = (app) => {

  let image = new Image();

  router.post('/image/', image.create);

  router.get('/', image.getAll);

  app.use('/upload', Auth.hasAuthorization, router);
};
