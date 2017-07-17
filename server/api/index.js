import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import db from './db';
import api from './api';
import path from 'path';

var app = express();

app.use(express.json({limit: '15mb'}));
app.use(express.urlencoded({limit: '15mb'}));

/* Config Upload */
let publicDir = path.join(__dirname, '../public/');
app.use(express.static(publicDir));
/* End Config upload */

app.server = http.createServer(app);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('../dist/'));
db(() => {
  app.use('/', api(app));
  process.on('SIGINT', () => {
    console.log("\nStopping...");
    process.exit();
  });
  app.server.listen(process.env.PORT || 3000);
  console.log(`Server started`);
});


export default app;
