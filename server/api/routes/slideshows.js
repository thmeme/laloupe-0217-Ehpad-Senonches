import express from 'express';
import Slideshow from '../models/imgslideshow.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var imgslideshow = new Imgslideshow();

    router.get('/:id', Auth.hasAuthorization, imgslideshow.findById);

    router.get('/', Auth.hasAuthorization, imgslideshow.findAll);

    router.post('/admin/', Auth.isAdministrator, imgslideshow.create);
    router.post('/', Auth.hasAuthorization, imgslideshow.createByUser);

    router.put('/admin/:id', Auth.isAdministrator, imgslideshow.update);
    router.put('/:id', Auth.hasAuthorization, imgslideshow.updateByUser);

    router.delete('/:id', Auth.isAdministrator, imgslideshow.delete);

    app.use('/slideshow', router);
};
