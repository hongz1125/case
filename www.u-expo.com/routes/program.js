var path = require('path');
var pool = require(path.join(__dirname, '../config/sql'));
var express = require('express');
var router = express.Router();
var async = require('async');


router.get('/list',function(req,res,next){
  let param = {};
  param.tag = req.query.tag;
  param.page = req.query.page || 1;
  param.page_size = 10;
  param.ids = [];

  let tasks = {
    find_ids:function(callback){
      if(!param.tag){
        callback();
        return;
      }
      let sql = `SELECT * FROM \`relation_case_tag\` WHERE \`tag_id\` = '${param.tag}' LIMIT 0,1000`;
      pool.query(sql, function(err, result) {
        for(var i in result){
          param.ids.push(result[i].case_id)
        }
        callback(err);
      });
    },
    get_list: function(callback) {
      if(!param.ids.length){
        callback();
        return;
      }
      param.page_count = param.ids.length;
      let where = param.ids.reduce((sam,obj) => {
        sam.push(`\`id\` = '${obj}'`);
        return sam;
      },[]).join(' OR ');
      let sql = `SELECT * FROM \`case\` WHERE ${where} ORDER BY \`dateline\` LIMIT ${(param.page-1)*10},10`;
      pool.query(sql, function(err, result) {
        if(err){
          callback(err);
        }else{
          param.list = result;
          callback()
        }
      });
    },
    list: function(callback) {
      callback()
      // let sql = 'SELECT * FROM `case` ORDER BY `id` DESC LIMIT ' + body.page * body.page_size + "," + body.page_size;
      // pool.query(sql, function(err, result) {
      //     let list = [];
      //     for(var i in result){
      //       list.push(result[i]);
      //     }
      //     callback(err, list);
      // });
    }
  };
  async.series(tasks, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      req.query.debug ? res.json(param) : res.render('program/list.html', param);
    }
  });
})

router.get('/detail', function(req, res, next) {
  let param = {};
  param.id = req.query.id;
  let tasks = {
    get_detail: function(callback) {
      let sql = `SELECT * FROM \`case\` WHERE \`id\` = '${param.id}' LIMIT 0,100`;  
      pool.query(sql, function(err, result) {
        if(err){
          callback(err);
          return;
        }
        if(result[0]){
          param.data = result[0];
          param.data.pic = JSON.parse(param.data.pic);
          callback(err);
        }else{
          callback({code:11,msg:'没有找到数据!'})
        }
      });
    },
    get_tag:function(callback){
      let sql = `SELECT * FROM \`relation_case_tag\` WHERE \`case_id\` = '${param.id}'`;
      pool.query(sql, function(err, result) {
        param.tags = result.reduce((sam,obj) => {
          sam.push(obj.tag_id);
          return sam;
        },[]);
        callback(err);
      });
    },
    get_tag_name:function(callback){
      if(param.tags.length == 0){
        callback();
        return;
      };
      let where = '';
      where = param.tags.reduce((sam,obj) => {
        sam.push(`\`id\` = '${obj}'`);
        return sam;
      },[]).join(' or ');
      let sql = `SELECT * FROM \`tag\` WHERE ${where}`;
      pool.query(sql, function(err, result) {
        param.data.tag_list = result;
        callback(err);
      });
    }
  };
  async.series(tasks, function(err, results) {
    if(err) {
      res.json(err);
    } else {
      req.query.debug ? res.json(param) : res.render('program/detail.html', param);
    }
  });
});


module.exports = router;