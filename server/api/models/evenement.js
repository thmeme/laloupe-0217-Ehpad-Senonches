import mongoose from 'mongoose';
import evenement from './evenement.js';


const evenementSchema = new mongoose.Schema({
      date: {
        type: Date,
        default: Date.default
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      title: {
        type: String,
        require: true
      },
      content: {
        type: String,
        require: true
      }
});

let model = mongoose.model('Evenement', evenementSchema);

export default class Evenement {

  findAll(req, res) {
    model.find({},
      (err, evenement) => {
        if (err || !evenement) {
          res.sendStatus(403);
        } else {
          res.json(evenement);
          console.log('getAll');
        }
      });
  }

  // findById(req, res) {
  //   console.log('req in back', req.params, req.body, req.query);
  //   model.findById(req.params.id, function(err, evenement) {
  //     if (err || !evenement) {
  //       res.sendStatus(403);
  //     } else {
  //       res.json(evenement);
  //     }
  //   });
  // }
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
  // update(req, res) {
  //   model.findByIdAndUpdate(req.params.id,
  //     req.body, {
  //       new: true
  //     },
  //     function(err, evenements) {
  //       if (err) {
  //         res.status(500).send(err);
  //       } else {
  //         res.json({
  //           success: true,
  //           evenements: evenements
  //         });
  //       }
  //     });
  // }
  // delete(req, res) {
  //   model.findByIdAndRemove(req.params.id, function(err) {
  //     if (err) {
  //       res.status(500).send(err.message);
  //     } else {
  //       res.sendStatus(200);
  //     }
  //   });
  // }
}
