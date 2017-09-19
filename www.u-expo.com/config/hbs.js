var hbs = require('hbs');
var moment = require('moment');

hbs.registerHelper('format_date', function(person) {
  return moment(+person).format('YYYY-MM-DD');
});

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
hbs.registerHelper('pic_list_small', function(person) {
  var html = '';
  for(var i = 0;i<4;i++){
  		html += `<li><img src="http://localhost:6002${person[i].url}"></li>`;
  }
  return new hbs.SafeString(html);
});

module.exports = hbs;
