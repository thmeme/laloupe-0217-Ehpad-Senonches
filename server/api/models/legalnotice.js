import mongoose from 'mongoose';
import legalnotice from './legalnotice.js';
import User from './user.js';

const legalnoticeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  companyaddress: {
    type: String,
  },
  companyzipcode: {
    type: String,
    required: true
  },
  companycity: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  mailpublisher: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  hostaddress: {
    type: String,
    required: true
  },
  hostzipcode: {
    type: String,
    required: true
  },
  hostcity: {
    type: String,
    required: true
  }
});

let model = mongoose.model('Legalnotice', legalnoticeSchema);

export default class Legalnotice {


  findAllByUser(req, res) {
    model.find({})
      .populate('author')
      .exec((err, legalnotice) => {
        if (err || !legalnotice) {
          res.sendStatus(403);
        } else {
          res.json(legalnotice);
        }
      });
  }
  findById(req, res) {
    model.findById(req.params.id, (err, legalnotice) => {
      if (err || !legalnotice) {
        res.sendStatus(403);
      } else {
        res.json(legalnotice);
      }
    });
  }
  update(req, res) {
    model.findOneAndUpdate(req.params.id,
      req.body, {
        upsert: true
      },
      function(err, legalnotice) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            legalnotice: legalnotice
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
      function(err, legalnotice) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            legalnotice: legalnotice
          });
        }
      });
  }
}
