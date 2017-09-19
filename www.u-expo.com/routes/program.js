var path = require('path');
var pool = require(path.join(__dirname, '../config/sql'));
var express = require('express');
var router = express.Router();
var async = require('async');


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