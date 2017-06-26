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
    date: {
        type: Date,
    },
    isOnline: {
      type: Boolean,
      default: false,
    }
});

let model = mongoose.model('Welcome', welcomeSchema);

export default class Welcome {

    findAll(req, res) {
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

    findAllAnon(req, res) {
        model.find({isOnline: true})
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
        console.log('req in back', req.params, req.body, req.query);
        model.findById(req.params.id, (err, welcome) => {
          if (err || !welcome) {
              res.sendStatus(403);
          } else {
              res.json(welcome);
          }
        });
    }
    create(req, res) {
      console.log('route admin');
        let welcome = req.body;
        console.log('back', req.body);
        welcome.date = new Date().toISOString();
        model.create(welcome, (err, welcome) => {
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    welcome: welcome
                });
            }
        });
    }
    createByUser(req, res) {
      console.log('route non admin');
        let welcome = req.body;
        console.log('back', req.body);
        welcome.date = new Date().toISOString();
        // delete submenu.isOnline;
        model.create(welcome, (err, welcome) => {
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    welcome: welcome
                });
            }
        });
    }
    update(req, res) {
      console.log('route non admin');
        model.findByIdAndUpdate(req.params.id,
          req.body, { new: true },function(err, welcome) {
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
      delete req.body.isOnline;
        model.findByIdAndUpdate(req.params.id,
          req.body, { new: true },function(err, welcome) {
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

    delete(req, res) {
      console.log('req remove', req.params);
        model.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
