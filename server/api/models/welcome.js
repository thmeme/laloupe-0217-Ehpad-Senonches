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
    date: {
        type: Date,
    },
    id : {
      type: String,
    }
});

let model = mongoose.model('Welcome', welcomeSchema);

export default class Welcome {

    // findAll(req, res) {
    //   console.log('find1');
    //     model.find({})
    //     .populate('author')
    //     .exec((err, welcome) => {
    //             if (err || !welcome) {
    //                 res.sendStatus(403);
    //             } else {
    //                 res.json(welcome);
    //             }
    //         });
    // }

    findAllByUser(req, res) {
      console.log('find2');
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

    // findAllAnon(req, res) {
    //   console.log('find3');
    //     model.find({isOnline: true})
    //     .populate('author')
    //     .exec((err, welcome) => {
    //             if (err || !welcome) {
    //                 res.sendStatus(403);
    //             } else {
    //                 res.json(welcome);
    //             }
    //         });
    // }

    findById(req, res) {
      console.log('find4');
        console.log('req in back', req.params, req.body, req.query);
        model.findById(req.params.id, (err, welcome) => {
          if (err || !welcome) {
              res.sendStatus(403);
          } else {
              res.json(welcome);
          }
        });
    }
    // create(req, res) {
    //   console.log('route admin');
    //     let welcome = req.body;
    //     console.log('back', req.body);
    //     welcome.date = new Date().toISOString();
    //     model.create(welcome, (err, welcome) => {
    //         if (err) {
    //             res.status(500).send({
    //                 error: err
    //             });
    //         } else {
    //             res.json({
    //                 success: true,
    //                 welcome: welcome
    //             });
    //         }
    //     });
    // }
    // createByUser(req, res) {
    //   console.log('route non admin');
    //     let welcome = req.body;
    //     console.log('back', req.body);
    //     welcome.date = new Date().toISOString();
    //     model.create(welcome, (err, welcome) => {
    //         if (err) {
    //             res.status(500).send({
    //                 error: err
    //             });
    //         } else {
    //             res.json({
    //                 success: true,
    //                 welcome: welcome
    //             });
    //         }
    //     });
    // }
    update(req, res) {
      console.log('route admin');
      console.log('rep update', req.body);

        model.findOneAndUpdate(req.params.id,
          req.body, { upsert: true },function(err, welcome) {
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
      console.log('req update user', req.body);
        model.findOneAndUpdate(req.params.id,
          req.body, { upsert: true, new:true },function(err, welcome) {
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

    // delete(req, res) {
    //   console.log('req remove', req.params);
    //     model.findByIdAndRemove(req.params.id, function(err) {
    //         if (err) {
    //             res.status(500).send(err.message);
    //         } else {
    //             res.sendStatus(200);
    //         }
    //     });
    // }
}
