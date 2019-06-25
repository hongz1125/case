/*
@author devil
@title 微信分享专用
@eg
require(['wx_share']);//默认执行
globalWX.shareFun();//如需修改分享信息 调用全局变量shareFun方法;

html 接口部分

    <input type="hidden" id="wx-appId" value='后端提供'/>
    <input type="hidden" id="wx-timestamp" value='后端提供'/>
    <input type="hidden" id="wx-nonceStr" value='后端提供'/>
    <input type="hidden" id="wx-signature" value='后端提供'/>
    <input type="hidden" id="wx-jsApiList" value='onMenuShareTimeline,onMenuShareQQ,onMenuShareAppMessage,onMenuShareWeibo'/>

    <input type="hidden" id="wx-share-title" value="标题"/>
    <input type="hidden" id="wx-share-desc" value="描述"/>
    <input type="hidden" id="wx-share-link" value="链接"/>
    <input type="hidden" id="wx-share-imgUrl" value="图片链接"/>

*/
require(['http://res.wx.qq.com/open/js/jweixin-1.0.0.js'],function(wx){
  window.globalWX =wx;
  wx.config({
      debug: false,
      appId: $("#wx-appId").val(),
      timestamp: $("#wx-timestamp").val(),
      nonceStr: $("#wx-nonceStr").val(),
      signature: $("#wx-signature").val(),
      jsApiList: $("#wx-jsApiList").val().split(",")
  });
  window.globalWX.shareFun = function(){
    var opt = {
      title: $("#wx-share-title").val(), // 分享标题
      desc: $("#wx-share-desc").val(), // 分享描述
      link: $("#wx-share-link").val(), // 分享链接
      imgUrl: $("#wx-share-imgUrl").val(), // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    };
    wx.ready(function(){
      wx.onMenuShareTimeline(opt);
      wx.onMenuShareAppMessage(opt);
      wx.onMenuShareQQ(opt);
      wx.onMenuShareWeibo(opt);
    });
  };
  window.globalWX.shareFun();
  return false;
})
