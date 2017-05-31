import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import fs from 'fs';
import dir from 'node-dir';

let pdfDir = path.join(__dirname, '../../public/uploads/pdf/');
/* Multer storage settings */
let name = '';

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, pdfDir);
  },
  filename: function(req, file, cb) {
  name = file.originalname.split('.').shift();
    // let datetimestamp = Date.now();
    cb(null, encodeURI(name) + '.pdf');
  }
});

let upload = multer({
  storage: storage
}).single('pdf');

export default class Pdf {

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

  getAll(req, res) {
    dir.files(pdfDir, function(err, files) {
      if (err) throw err;
      console.log(files);
      let fileNames = files.map((file) => {
        return {fileName: file.split('/').pop()};
      });
      console.log(fileNames);
      res.json(fileNames);
    });
  }

}
