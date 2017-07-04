import mongoose from 'mongoose';
import slideshow from './slideshow.js';

const slideshowSchema = new mongoose.Schema({

  name: {
    type: String,
  },
  date: {
    type: Date
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
    model.findById(req.params.id, function(err, slideshow) {
      if (err || !slideshow) {
        res.sendStatus(403);
      } else {
        res.json(slideshow);
      }
    });
  }
  create(req, res) {
    let slideshow = req.body;
    console.log('back', req.body);
    slideshow.date = new Date().toISOString();
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
    let slideshow = req.body;
    console.log('back', req.body);
    news.date = new Date().toISOString();
    delete submenu.isOnline;
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
  update(req, res) {
    console.log('req update', req.body);
    model.update(req.body, function(err, slideshow) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          success: true,
          slideshows: slideshow
        });
      }
    });
  }
  updateByUser(req, res) {
    console.log('req update', req.body);

    model.update(
      req.body, {
        slideshow: true
      },
      function(err, slideshow) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            slideshow: slideshow
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
