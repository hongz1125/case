var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  let param = {};
  res.render('home.html', param);
});


module.exports = router;