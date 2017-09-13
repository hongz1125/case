var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  res.render('admin/index.html', param);
});

//进入 项目 编辑页 
router.get('/edit', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  res.render('admin/index_edit.html', param);
});



router.get('/edit', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  res.render('admin/index_edit.html', param);
});
router.get('/tag', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  res.render('admin/tag.html', param);
});



module.exports = router;