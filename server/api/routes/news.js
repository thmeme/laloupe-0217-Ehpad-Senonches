import express from 'express';
import News from '../models/news.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var news = new News();

    router.get('/:id', Auth.hasAuthorization, news.findById);

    router.get('/', Auth.hasAuthorization, news.findAll);

    router.post('/', Auth.hasAuthorization, news.create);

    router.put('/:id', Auth.hasAuthorization, news.update);

    router.delete('/:id', Auth.isAdministrator, news.delete);

    app.use('/news', router);
};
