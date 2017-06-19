import mongoose from 'mongoose';
import submenu from './submenu.js';

const newsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    isOnline: {
      type: Boolean,
      default: false,
    }
});
let model = mongoose.model('news', newsSchema);

export default class News {

    findAll(req, res) {
        model.find({},
            (err, news) => {
                if (err || !news) {
                    res.sendStatus(403);
                } else {
                    res.json(news);
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
        let news = req.body;
        console.log('back', req.body);
        news.date = new Date().toISOString();
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
    createByUser(req, res) {
        let news = req.body;
        console.log('back', req.body);
        news.date = new Date().toISOString();
        delete news.isOnline;
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
      delete news.isOnline;
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
        model.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
