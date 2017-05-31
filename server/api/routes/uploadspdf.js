import express from 'express';
import Auth from '../middlewares/authorization.js';
import Pdf from '../libs/pdfUpload.js';

let router = express.Router();

module.exports = (app) => {

  let pdf = new Pdf();

  router.post('/pdf/', Auth.hasAuthorization, pdf.create);

  router.get('/', Auth.hasAuthorization, pdf.getAll);

  app.use('/uploadpdf', router);
};
