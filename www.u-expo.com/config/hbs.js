var hbs = require('hbs');
var moment = require('moment');

//格式化时间
hbs.registerHelper('format_date', function(person) {
  return moment(+person).format('YYYY-MM-DD');
});
//格式化前台时间
hbs.registerHelper('format_show_date', function(time) {
  let html = `<div class="zl62_date_dd">${moment(+time).format('DD')}<i>/</i></div>
                <div class="zl62_date_mm">${moment(+time).format('MM')}</div>
                <div class="zl62_date_yy">${moment(+time).format('YYYY')}</div>`

  return new hbs.SafeString(html);
});

//显示大图
hbs.registerHelper('pic_list', function(person) {
  var html = '';
  for(var i = 0;i<4;i++){
  	if(i == 0){
  		html += `<li><img src="http://localhost:6002${person[i].url}"></li>`;
  	}else{
  		html += `<li style="display:none;"><img src="http://localhost:6002${person[i].url}"></li>`;
  	}
  }
  return new hbs.SafeString(html);
});
//显示小图
hbs.registerHelper('pic_list_small', function(person) {
  var html = '';
  for(var i = 0;i<4;i++){
  		html += `<li><img src="http://localhost:6002${person[i].url}"></li>`;
  }
  return new hbs.SafeString(html);
});

//分页
hbs.registerHelper('page', function(page,page_size,page_total) {
  var html = '';
  let page_len = Math.ceil(61/10);
  console.log(page_len)
  // while(page_len){
  //   page_len--;
  //   console.log()
  // }
  return new hbs.SafeString(html);
});

module.exports = hbs;
