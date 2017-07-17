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
    let datetimestamp = Date.now();

    name = file.originalname.split('.').shift();
    cb(null, datetimestamp + '-' + encodeURIComponent(name).replace(/%20/gi, "_") + '.pdf');

  }
});

let upload = multer({
  storage: storage, 
  limits: {
    fileSize: 10000000
  }
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
      let fileNames = files.filter(file => file.split('.').pop() === 'pdf').map((file) => {
        return {
          fileName: file.split('/').pop()
        };
      });
      res.json(fileNames);
    });
  }
}
