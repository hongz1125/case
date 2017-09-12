var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let param = {};
  if (req.cookies.is_login){
    res.redirect('/admin');
    return;
  }
  res.render('admin/login.html', param);
});


module.exports = router;