import mongoose from 'mongoose';
import welcome from './welcome.js';
import User from './user.js';

const welcomeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  date: Date
});

let model = mongoose.model('Welcome', welcomeSchema);

export default class Welcome {

  findAllByUser(req, res) {
    model.find({})
      .populate('author')
      .exec((err, welcome) => {
        if (err || !welcome) {
          res.sendStatus(403);
        } else {
          res.json(welcome);
        }
      });
  }

  findById(req, res) {
    model.findById(req.params.id, (err, welcome) => {
      if (err || !welcome) {
        res.sendStatus(403);
      } else {
        res.json(welcome);
      }
    });
  }

  update(req, res) {
    model.findOneAndUpdate(req.params.id,
      req.body, {
        upsert: true
      },
      function(err, welcome) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            welcome: welcome
          });
        }
      });
  }
  updateByUser(req, res) {
    model.findOneAndUpdate(req.params.id,
      req.body, {
        upsert: true,
        new: true
      },
      function(err, welcome) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            welcome: welcome
          });
        }
      });
  }
}
