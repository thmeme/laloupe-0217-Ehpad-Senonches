import express from 'express';
import News from '../models/new.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var news = new News();

    router.get('/:id', Auth.hasAuthorization, news.findById);

    router.get('/', Auth.hasAuthorization, news.findAll);

    router.post('/admin/', Auth.isAdministrator, news.create);
    router.post('/', Auth.hasAuthorization, news.createByUser);

    router.put('/admin/:id', Auth.isAdministrator, news.update);
    router.put('/:id', Auth.hasAuthorization, news.updateByUser);

    router.delete('/:id', Auth.isAdministrator, news.delete);

    app.use('/news', router);
};
