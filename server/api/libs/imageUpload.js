import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';






let imageDir = path.join(__dirname, '../../public/uploads/images/');
/* Multer storage settings */
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageDir);
  },
  filename: function(req, file, cb) {
    let datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

let upload = multer({
  storage: storage
}).single('image');

export default class Image {

  create(req, res) {
    upload(req, res, function(err) {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      } else {
        res.json({
          success: true,
        });
      }
    });
  }

}
