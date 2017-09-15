var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  param.nav = '0';
  res.render('admin/index.html', param);
});

//项目 列表页
router.get('/case', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  param.nav = 'case';
  res.render('admin/case.html', param);
});
//项目 编辑页 
router.get('/case/edit', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  param.nav = 'case';
  res.render('admin/case_edit.html', param);
});

//标签 列表页
router.get('/tag', function(req, res, next) {
  let param = {};
  if (!req.cookies.is_login){
    res.redirect('/login');
    return;
  }
  param.nav = 'tag';
  res.render('admin/tag.html', param);
});



module.exports = router;