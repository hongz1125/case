var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
var multer  = require('multer');
var moment = require('moment');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./static/upload/');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
      let type = file.originalname.substr(file.originalname.indexOf('.'));
      let time = moment().format('YYYYMMDD_HHmmss')
      cb(null, time + type);
    }
});
var upload = multer({ storage: storage })

// 创建连接

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host : '127.0.0.1',
  user : 'root',
  password : 'root',
  database : 'u_expo'
});

//---------------


//登陆页 - 用户登陆
router.post('/login', function(req, res, next) {
  let param = {};
  if (req.body.username == 'admin' && req.body.password == 'admin!@#') {
    res.cookie("is_login",1,{maxAge:24*60*60*1000});
      res.send(JSON.stringify({ code:0 }));
  } else {
      res.send(JSON.stringify({code:1,msg:'用户名或者密码错误！'}));
  }
});


//列表页 - 获取列表
router.post('/case/list',function(req, res, next){

  if(!is_login(req,res)) return;


  let param = {
    data:{},
    code:0
  };
  let body = {
    page:+req.body.page - 1,
    page_size:+req.body.page_size
  };

  let tasks = {
    page_total: function(callback) {
      let query = 'SELECT COUNT(1) FROM `case`';
      pool.query(query, function(err, result) {
        callback(err, result[0]['COUNT(1)']);
      });
    },
    list: function(callback) {
      let query = 'SELECT * FROM `case` ORDER BY `id` DESC LIMIT ' + body.page * body.page_size + "," + body.page_size;
      pool.query(query, function(err, result) {
          let list = [];
          for(var i in result){
            list.push(result[i]);
          }
          callback(err, list);
      });
    }
  };
  async.series(tasks, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      param.data = results;
      res.send(JSON.stringify(param));
    }
  });
})



//编辑页 - 上传图片
router.post('/upload',upload.single('file'), function(req, res, next){
    var file = req.file;
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    res.send({code:0,data:{name:file.originalname,url:file.path}});
})

//获取tag -tag
router.post('/tag/list',function(req,res,next){
    let query = {
      keyword: req.body.keyword || '',
      page: req.body.page ? (req.body.page - 1) : 0,
      page_size: req.body.page_size || 15,
    };
    let param = {
      data:{},
      code:0
    };
  let tasks = {
    page_total: function(callback) {
      let query = 'SELECT COUNT(1) FROM `tag`';
      pool.query(query, function(err, result) {
        callback(err, result[0]['COUNT(1)']);
      });
    },
    list:function(callback){
      let sql = "SELECT * FROM `tag` WHERE `value` LIKE '%" + query.keyword +"%' ORDER BY `id` DESC LIMIT " + query.page * query.page_size + "," + query.page_size;
      pool.query(sql, function(err, result) {
          let list = [];
          for(var i in result){
            list.push(result[i]);
          }
          callback(err, list);
      });
    }
  }

  async.series(tasks, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      param.data = results;
      res.send(JSON.stringify(param));
    }
  });
});


//tag - 添加tag
router.post('/tag/add',function(req,res,next){
  let query = {
    value: req.body.value
  };
  let param = {
    data:{},
    code:0
  };
  let sql = "SELECT * FROM `tag` WHERE `value` = '"+query.value+"'";
  pool.query(sql, function(err, result) {
    if(result.length){
      res.send(JSON.stringify({code:'3',msg:'重复啦！'}));
      return;
    }
    let sql  = "INSERT INTO `tag` (`value`) VALUES ('" +query.value+ "')";
    pool.query(sql,function(err,result){
      param.data = result.insertId;
      res.send(JSON.stringify(param));
    })
  });
});

//tag - 删除tag
router.post('/tag/del',function(req,res,next){
  let query = {
    id: req.body.id
  };
  let param = {
    data:{},
    code:0
  };
  let sql = "DELETE FROM `tag` WHERE `id` IN ('"+query.id+"')";
  pool.query(sql, function(err, result) {
    res.send(JSON.stringify(param));
  });
});


//---------------


module.exports = router;

function is_login(req,res){
  if(!req.cookies.is_login){
    res.send(JSON.stringify({code:1}));
    return false;
  };
  return true;
}

