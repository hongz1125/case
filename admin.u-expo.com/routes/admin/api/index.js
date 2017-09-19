var path = require('path');
var pool = require('../../../config/sql');
var express = require('express');
var router = express.Router();
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

//---------------


//登陆页 - 用户登陆
router.post('/login', function(req, res, next) {
  let param = {};
  if (req.body.username == 'admin' && req.body.password == 'admin!@#') {
    res.cookie("is_login",1,{maxAge:24*60*60*1000});
      res.json({ code:0 });
  } else {
      res.json({code:1,msg:'用户名或者密码错误！'});
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
      res.json(param);
    }
  });
})

// 单条 - 详细
router.post('/case/detail',function(req, res, next){
  let query = {},param = {data:{},code:0};
  query.id = req.body.id;
  let tasks = {
    get_detail: function(callback) {
      let sql = `SELECT * FROM \`case\` WHERE \`id\` = '${query.id}' LIMIT 0,100`;
      pool.query(sql, function(err, result) {
        if(err){
          callback(err);
          return;
        }
        if(result[0]){
          param.data = result[0];
          callback(err);
        }else{
          callback({code:11,msg:'没有找到数据!'})
        }
      });
    },
    get_tag:function(callback){
      let sql = `SELECT * FROM \`relation_case_tag\` WHERE \`case_id\` = '${query.id}'`;
      pool.query(sql, function(err, result) {
        query.tags = result.reduce((sam,obj) => {
          sam.push(obj.tag_id);
          return sam;
        },[]);
        callback(err);
      });
    },
    get_tag_name:function(callback){
      if(query.tags.length == 0){
        callback();
        return;
      };
      let sql = `SELECT * FROM \`tag\` WHERE `;
      let where = '';
      where = query.tags.reduce((sam,obj) => {
        sam.push(`\`id\` = '${obj}'`);
        return sam;
      },[]).join(' or ');
      pool.query(sql + where, function(err, result) {
        param.data.tag_list = result;
        callback(err);
      });
    }
  }
  async.series(tasks, function(err, results) {
    if(err) {
      res.json(err);
    } else {
      res.json(param);
    }
  });
})

//---------获取单条 保存
router.post('/case/edit',function(req, res, next){
  let query = {},param = {data:{},code:0};
  query.id = req.body.id;
  query.cn_name = req.body.cn_name;
  query.en_name = req.body.en_name;
  query.custom = req.body.custom;
  query.city = req.body.city;
  query.start_time = req.body.start_time;
  query.end_time = req.body.end_time;
  query.pic = req.body.pic;
  query.tag_list = JSON.parse(req.body.tag_list);

  let tasks = {
    save_case: function(callback) {
      if(query.id){
        let sql = `UPDATE \`case\` SET 
          \`cn_name\` = '${query.cn_name}' ,
          \`en_name\` = '${query.en_name}' ,
          \`custom\` = '${query.custom}' ,
          \`city\` = '${query.city}' ,
          \`start_time\` = '${query.start_time}' ,
          \`end_time\` = '${query.end_time}' ,
          \`dateline\` = '${+new Date()}' ,
          \`pic\` = '${query.pic}' 
          WHERE \`id\` = '${query.id}'`;
        pool.query(sql, function(err, result) {
          callback(err);
        });
      }else{
        let sql = `INSERT INTO \`case\` VALUES 
          (null, '${query.cn_name}', '${query.en_name}', '${query.custom}', '${query.city}', '${query.start_time}', '${query.end_time}', '${+new Date()}', '${query.pic}')`;
        pool.query(sql, function(err, result) {
          query.id = result.insertId;
          callback(err);
        });
      }
    },
    del_relation:function(callback){
      let sql = `DELETE FROM \`relation_case_tag\` WHERE \`case_id\` = ('${query.id}')`;
      pool.query(sql, function(err, result) {
        callback(err);
      });
    },
    add_relation:function(callback){
      if(query.tag_list.length == 0){
        callback();
        return;
      }
      let value = query.tag_list.reduce((sam,obj) => {
        sam.push(`(null,'${query.id}','${obj.id}')`);
        return sam;
      },[]).join(',');
      let sql = `INSERT INTO \`relation_case_tag\` (\`id\`, \`case_id\`, \`tag_id\`) VALUES ${value}`;
      pool.query(sql, function(err, result) {
        callback(err);
      });
    },
  }
  async.series(tasks, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      res.json(param);
    }
  });
})

//项目 删除
router.post('/case/del',function(req, res, next){
  let query = {},param = {data:{},code:0};
  query.id = req.body.id;
  let tasks = {
    del_case: function(callback) {
        let sql = `DELETE FROM \`case\` WHERE \`id\` IN ('${query.id}')`;
        pool.query(sql, function(err, result) {
          callback(err);
        });
    }
  }
  async.series(tasks, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      res.json(param);
    }
  });
})


//编辑页 - 上传图片
router.post('/upload',upload.single('file'), function(req, res, next){
    var file = req.file;
    res.json({code:0,data:{name:file.originalname,url:'/' + file.path}});
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
      res.json(param);
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
      res.json({code:'3',msg:'重复啦！'});
      return;
    }
    let sql  = "INSERT INTO `tag` (`value`) VALUES ('" +query.value+ "')";
    pool.query(sql,function(err,result){
      param.data = result.insertId;
      res.json(param);
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
    res.json(param);
  });
});


//---------------


module.exports = router;

function is_login(req,res){
  if(!req.cookies.is_login){
    res.json({code:1});
    return false;
  };
  return true;
}

