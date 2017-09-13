var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let param = {};
  if (req.cookies.is_login){
    res.redirect('/admin');
    return;
  }
  param.no_login = true;
  res.render('admin/login.html', param);
});

router.get('/out', function(req, res, next) {
  let param = {};
  res.cookie('is_login', '', {expires: new Date(0)});
  res.redirect('/login');
});


module.exports = router;