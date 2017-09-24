function do_ajax(param) {
  return new Promise((resolve, reject) => {
    let params = Object.assign({},{type:'POST',dataType:'html'},param);
    console.log(params);
    $.ajax(params).done((result, textStatus, jqXHR) => {
        try{
          let res = JSON.parse(result);
          setTimeout(() => {
            if (res.code == 0) {
              resolve(res);
            } else {
              reject(res.msg || '返回数据格式错误！');
            }
          },200)
        }catch(err){
          reject('返回数据格式错误！');
          console.error('json: error', err);
        }
      }).fail((jqXHR, textStatus, errorThrown) => {
        reject('返回数据格式错误！');
        console.error('jquery: error', jqXHR, textStatus, errorThrown);
      })
  });
}

$.getUrlParam = function(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
   var r = window.location.search.substr(1).match(reg);
   if (r != null) return unescape(r[2]);
   return null;
 }