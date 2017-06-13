import mongoose from 'mongoose';
import slideshow from './slideshow.js';

const slideshowSchema = new mongoose.Schema({

    name: {
        type: String,
    }
});
let model = mongoose.model('slideshow', slideshowSchema);

export default class Slideshow {

    findAll(req, res) {
        model.find({},
            (err, slideshow) => {
                if (err || !slideshow) {
                    res.sendStatus(403);
                } else {
                    res.json(slideshow);
                }
            });
    }
    findById(req, res) {
        console.log('req in back', req.params, req.body, req.query);
        model.findById(req.params.id, function(err, news) {
          if (err || !news) {
              res.sendStatus(403);
          } else {
              res.json(news);
          }
        });
    }
    create(req, res) {
        let slideshow = req.body;
        console.log('back', req.body);
        // news.date = new Date().toISOString();
        model.create(slideshow, (err, slideshow) => {
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    slideshow: slideshow
                });
            }
        });
    }
    createByUser(req, res) {
        let news = req.body;
        console.log('back', req.body);
        news.date = new Date().toISOString();
        delete submenu.isOnline;
        model.create(news, (err, news) => {
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    news: news
                });
            }
        });
    }
    update(req, res) {
        model.findByIdAndUpdate(req.params.id,
          req.body, { new: true },function(err, news) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json({
                  success: true,
                  news: news
              });
            }
        });
    }
    updateByUser(req, res) {
      delete submenu.isOnline;
        model.findByIdAndUpdate(req.params.id,
          req.body, { new: true },function(err, news) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json({
                  success: true,
                  news: news
              });
            }
        });
    }
    delete(req, res) {
      console.log('delete', req.params.id);
        model.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
