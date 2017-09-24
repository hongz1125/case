var path = require('path');
var pool = require(path.join(__dirname, '../config/sql'));
var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/', function(req, res, next) {
    let param = {
    	data:{}
    };

  param.data.list_1 = [];
  param.data.list_2 = [];
  param.data.list_3 = [];

  let tasks = {
    find_id1:function(callback){
      let sql = `SELECT * FROM \`relation_case_tag\` WHERE \`tag_id\` = '31' LIMIT 0,1000`;
      pool.query(sql, function(err, result) {
        for(var i in result){
          param.data.list_1.push(result[i].case_id)
        }
        callback(err);
      });
    },
    find_id2:function(callback){
      let sql = `SELECT * FROM \`relation_case_tag\` WHERE \`tag_id\` = '32' LIMIT 0,1000`;
      pool.query(sql, function(err, result) {
        for(var i in result){
          param.data.list_2.push(result[i].case_id)
        }
        callback(err);
      });
    },
    find_id3:function(callback){
      let sql = `SELECT * FROM \`relation_case_tag\` WHERE \`tag_id\` = '33' LIMIT 0,1000`;
      pool.query(sql, function(err, result) {
        for(var i in result){
          param.data.list_3.push(result[i].case_id)
        }
        callback(err);
      });
    },
    get_list1: function(callback) {
      let where = param.data.list_1.reduce((sam,obj) => {
        sam.push(`\`id\` = '${obj}'`);
        return sam;
      },[]).join(' OR ');
      let sql = `SELECT * FROM \`case\` WHERE ${where} ORDER BY \`start_time\` LIMIT 0,2`;
      pool.query(sql, function(err, result) {
        if(err){
          callback(err);
        }else{
          param.data.list_31 = result;
          result.reduce((sam,obj) => {
            obj.pic = JSON.parse(obj.pic);
            return sam;
          },[])
          callback(err);
        }
      });
    },
    get_list2: function(callback) {
      let where = param.data.list_2.reduce((sam,obj) => {
        sam.push(`\`id\` = '${obj}'`);
        return sam;
      },[]).join(' OR ');
      let sql = `SELECT * FROM \`case\` WHERE ${where} ORDER BY \`start_time\` LIMIT 0,2`;
      pool.query(sql, function(err, result) {
        if(err){
          callback(err);
        }else{
          param.data.list_32 = result;
          result.reduce((sam,obj) => {
            obj.pic = JSON.parse(obj.pic);
            return sam;
          },[])
          callback(err);
        }
      });
    },
    get_list3: function(callback) {
      let where = param.data.list_3.reduce((sam,obj) => {
        sam.push(`\`id\` = '${obj}'`);
        return sam;
      },[]).join(' OR ');
      let sql = `SELECT * FROM \`case\` WHERE ${where} ORDER BY \`start_time\` LIMIT 0,2`;
      pool.query(sql, function(err, result) {
        if(err){
          callback(err);
        }else{
          param.data.list_33 = result;
          result.reduce((sam,obj) => {
            obj.pic = JSON.parse(obj.pic);
            return sam;
          },[])
          callback(err);
        }
      });
    }
  };
  async.series(tasks, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      req.query.debug ? res.json(param) : res.render('home.html', param);
    }
  });
  // res.render('home.html', param)

});
  


router.get('/case/:id.html', function(req, res, next) {
  let param = {};
  res.render('case/' + req.params.id + '.html', param);
});
  
    

module.exports = router;