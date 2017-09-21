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
hbs.registerHelper('pic_first', function(pic) {
  return pic[0].url;
});

//显示大图
hbs.registerHelper('pic_list_big', function(person) {
  var html = '';
  for(var i = 0;i<4;i++){
  	if(i == 0){
  		html += `<li><img src="${person[i].url}"></li>`;
  	}else{
  		html += `<li style="display:none;"><img src="${person[i].url}"></li>`;
  	}
  }
  return new hbs.SafeString(html);
});
//显示小图
hbs.registerHelper('pic_list_small', function(person) {
  var html = '';
  for(var i = 0;i<4;i++){
  		html += `<li><img src="${person[i].url}"></li>`;
  }
  return new hbs.SafeString(html);
});

//分页
hbs.registerHelper('page', function(page,page_size,page_total,tag) {
  var html = '';
  let page_len = Math.ceil(page_total/page_size);
  if(page_len == 1){
    return '';
  }else{
    html += '<div class="zl_list_6_3 clearfix">';
    for(var i = 1;i <= page_len;i++){
      if(i == +page){
        html += `<a href="/program/list?tag=${tag}&page=${i}" class="hover">${i}</a>`
      }else{
        html += `<a href="/program/list?tag=${tag}&page=${i}">${i}</a>`
      }
    }
    html += '</div>';
  }
  console.log(html);
  return new hbs.SafeString(html);
});

module.exports = hbs;
