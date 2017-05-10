import express from 'express';
import Auth from '../middlewares/authorization.js';
import Image from '../libs/imageUpload.js';

let router = express.Router();

module.exports = (app) => {

  let image = new Image();

  router.post('/image/', Auth.hasAuthorization, image.create);

  app.use('/upload', router);
};
