$(function(){
    require(['wx_share']);
    $("#a3").click(function(){
      $("#wx-share-title").val('woshibiaoti');
      $("#wx-share-desc").val('我是说明');
      $("#wx-share-link").val('http:www.baidu.com');
      $("#wx-share-imgUrl").val('https://www.baidu.com/img/bdlogo.png');
       globalWX.shareFun();
     })
   
})

