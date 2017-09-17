var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    let param = {};
    res.render('home.html', param);
  });
  

router.get('/case/:id.html', function(req, res, next) {
  let param = {};
  res.render('case/' + req.params.id + '.html', param);
});
  
    

module.exports = router;