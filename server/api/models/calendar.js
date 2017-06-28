import mongoose from 'mongoose';
import evenement from './calendar.js';


const evenementSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.default,
    required: true
  },
  start: {
    type: Date,
    default: Date.default,
    required: true
  },
  author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  end: {
    type: Date,
    default: Date.default,
    required: true
  },
  title: {
    type: String,
    require: true,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false,
  }
});

let model = mongoose.model('Evenement', evenementSchema);

export default class Evenement {

  findAll(req, res) {
    model.find({})
    .populate('author')
    .exec((err, evenement) => {
        if (err || !evenement) {
          res.sendStatus(403);
        } else {
          res.json(evenement);
          console.log('getAll');
        }
      });
  }

  findAllAnon(req, res) {
    model.find({isOnline: true})
    .populate('author')
    .exec((err, evenement) => {
        if (err || !evenement) {
          res.sendStatus(403);
        } else {
          res.json(evenement);
          console.log('getAll');
        }
      });
  }

  findById(req, res) {
    console.log('req in back', req.params, req.body, req.query);
    model.findById(req.params.id, function(err, evenement) {
      if (err || !evenement) {
        res.sendStatus(403);
      } else {
        res.json(evenement);
      }
    });
  }
  create(req, res) {
    model.create(req.body, (err, evenement) => {
      if (err) {
        res.status(500).send({
          error: err
        });
      } else {
        res.json({
          success: true,
          evenement: evenement
        });
      }
    });
  }
  createByUser(req, res) {
    delete evenement.isOnline;
    model.create(req.body, (err, evenement) => {
      if (err) {
        res.status(500).send({
          error: err
        });
      } else {
        res.json({
          success: true,
          evenement: evenement
        });
      }
    });
  }
  update(req, res) {
    model.findByIdAndUpdate(req.params.id,
      req.body, { new: true },function(err, evenement) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            evenement: evenement
          });
        }
      });
  }
  updateByUser(req, res) {
    delete evenement.isOnline;
    model.findByIdAndUpdate(req.params.id,
      req.body, { new: true },function(err, evenement) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            evenement: evenement
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
