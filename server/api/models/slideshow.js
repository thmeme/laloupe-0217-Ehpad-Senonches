// import mongoose from 'mongoose';
// import slideshow from './slideshow.js';
//
// const imgslideshowSchema = new mongoose.Schema({
//
//     id: {
//         type: String,
//     },
//     name: {
//         type: String,
//     },
//     status: {
//       type: Boolean,
//       default: true,
//     }
// });
// let model = mongoose.model('imgslideshow', imgslideshowSchema);
//
// export default class Imgslideshow {
//
//     findAll(req, res) {
//         model.find({},
//             (err, news) => {
//                 if (err || !news) {
//                     res.sendStatus(403);
//                 } else {
//                     res.json(news);
//                 }
//             });
//     }
//     findById(req, res) {
//         console.log('req in back', req.params, req.body, req.query);
//         model.findById(req.params.id, function(err, news) {
//           if (err || !news) {
//               res.sendStatus(403);
//           } else {
//               res.json(news);
//           }
//         });
//     }
//     create(req, res) {
//         let news = req.body;
//         console.log('back', req.body);
//         news.date = new Date().toISOString();
//         model.create(news, (err, news) => {
//             if (err) {
//                 res.status(500).send({
//                     error: err
//                 });
//             } else {
//                 res.json({
//                     success: true,
//                     news: news
//                 });
//             }
//         });
//     }
//     createByUser(req, res) {
//         let news = req.body;
//         console.log('back', req.body);
//         news.date = new Date().toISOString();
//         delete submenu.isOnline;
//         model.create(news, (err, news) => {
//             if (err) {
//                 res.status(500).send({
//                     error: err
//                 });
//             } else {
//                 res.json({
//                     success: true,
//                     news: news
//                 });
//             }
//         });
//     }
//     update(req, res) {
//         model.findByIdAndUpdate(req.params.id,
//           req.body, { new: true },function(err, news) {
//             if (err) {
//               res.status(500).send(err);
//             } else {
//               res.json({
//                   success: true,
//                   news: news
//               });
//             }
//         });
//     }
//     updateByUser(req, res) {
//       delete submenu.isOnline;
//         model.findByIdAndUpdate(req.params.id,
//           req.body, { new: true },function(err, news) {
//             if (err) {
//               res.status(500).send(err);
//             } else {
//               res.json({
//                   success: true,
//                   news: news
//               });
//             }
//         });
//     }
//     delete(req, res) {
//         model.findByIdAndRemove(req.params.id, function(err) {
//             if (err) {
//                 res.status(500).send(err.message);
//             } else {
//                 res.sendStatus(200);
//             }
//         });
//     }
// }
