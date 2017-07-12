import express from 'express';
import Auth from '../middlewares/authorization.js';
import Pdf from '../libs/pdfUpload.js';

let router = express.Router();

module.exports = (app) => {

  let pdf = new Pdf();

  router.post('/pdf/', pdf.create);

  router.get('/', pdf.getAll);

  app.use('/uploadpdf', Auth.hasAuthorization, router);
};
