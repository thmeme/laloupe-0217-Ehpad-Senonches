import mongoose from 'mongoose';
import submenu from './submenu.js';
import User from './user.js';

const submenuSchema = new mongoose.Schema({
    menu: {
        type: String,
        required: true
    },
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

let model = mongoose.model('Submenu', submenuSchema);

export default class Submenu {

    findAll(req, res) {
        model.find({})
        .populate('author')
        .exec((err, submenu) => {
                if (err || !submenu) {
                    res.sendStatus(403);
                } else {
                    res.json(submenu);
                }
            });
    }

    findAllByUser(req, res) {
        model.find({})
        .populate('author')
        .exec((err, submenu) => {
                if (err || !submenu) {
                    res.sendStatus(403);
                } else {
                    res.json(submenu);
                }
            });
    }

    findAllAnon(req, res) {
        model.find({isOnline: true})
        .populate('author')
        .exec((err, submenu) => {
                if (err || !submenu) {
                    res.sendStatus(403);
                } else {
                    res.json(submenu);
                }
            });
    }

    findById(req, res) {
        console.log('req in back', req.params, req.body, req.query);
        model.findById(req.params.id, (err, submenu) => {
          if (err || !submenu) {
              res.sendStatus(403);
          } else {
              res.json(submenu);
          }
        });
    }
    create(req, res) {
      console.log('route admin');
        let submenu = req.body;
        console.log('back', req.body);
        submenu.date = new Date().toISOString();
        model.create(submenu, (err, submenu) => {
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    submenu: submenu
                });
            }
        });
    }
    createByUser(req, res) {
      console.log('route non admin');
        let submenu = req.body;
        console.log('back', req.body);
        submenu.date = new Date().toISOString();
        delete submenu.isOnline;
        model.create(submenu, (err, submenu) => {
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    submenu: submenu
                });
            }
        });
    }
    update(req, res) {
      console.log('route non admin');
        model.findByIdAndUpdate(req.params.id,
          req.body, { new: true },function(err, submenu) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json({
                  success: true,
                  submenu: submenu
              });
            }
        });
    }
    updateByUser(req, res) {
      delete req.body.isOnline;
        model.findByIdAndUpdate(req.params.id,
          req.body, { new: true },function(err, submenu) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json({
                  success: true,
                  submenu: submenu
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
