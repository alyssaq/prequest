'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var port = parseInt(process.env.PORT, 10) || 4567;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
router.route('/api')
  .get(function (req, res) {
    res.send('Success Get');
  })
  .post(function (req, res) {
    res.send({
      message: 'Success Post',
      data: req.body
    });
  });
app.use('/', router);

console.log('Server up at http://localhost:' + port);
app.listen(port);