function loadingLayer() {
  //设置游戏状态
  APP.state = 'loading';
  //创建图层
  var div = APP.addDiv('loading');
  //创建进度文字
  var bg = div.addSprite('bg');
  bg.img = APP.beforeImg['load_bg'];
  bg.pImg = APP.beforeImg["load_person"];
  bg.pImgIndex = 0;
  bg.painter.paint = function(s) {
    var pImgData = DATA.loadPersonData[s.pImgIndex];
    var pImgData2 = DATA.loadPerson2Data[s.pImgIndex];
    //绘制loading
    s
      .drawImage(
        s.img,
        0,
        0,
        APP.w,
        APP.h
      )
      .save()
      .translate(pImgData.x, pImgData.y)
      .drawImage(
        s.pImg,
        pImgData.sx,
        pImgData.sy,
        pImgData.sw,
        pImgData.sh,
        0,
        0,
        pImgData.w,
        pImgData.h
      )
      .restore()
      .save()
      .translate(pImgData.x, pImgData.y)
      .globalAlpha(APP.stateLoading)
      .drawImage(
        s.pImg,
        pImgData2.sx,
        pImgData2.sy,
        pImgData2.sw,
        pImgData2.sh,
        0,
        0,
        pImgData2.w,
        pImgData2.h
      )
      .restore()
      .save()
      .font("9px arial")
      .globalAlpha(.3)
      .textAlign("left")
      .textBaseline("top")
      .fillText(Math.floor(APP.stateLoading*100) + "%",0,0)
      .restore();
  };
  bg.behaviors["person"] = {};
  bg.behaviors["person"].lastTime = 0;
  bg.behaviors["person"].spaceTime = 300;
  bg.behaviors["person"].actioning = 1;
  bg.behaviors["person"].execute = function(s) {
    var _this = this;
      s.pImgIndex = s.pImgIndex + 1 > 3 ? 0 : s.pImgIndex + 1;
      _this.lastTime = APP.time;
  };
  gameLayerFrame();
}

//图片预加载
var AllImgReady = function(json) {
  APP.img = json;
  APP.stateLoading = 1;
  _.delay(learningLayer,200);
};
var AllImgCenter = function(i, j) {
  APP.stateLoading = Math.floor((i / j)*100)/100;
};

//用户登陆
function getUserLogin() {
  $.ajax({
    url: DATA.API.getLogin,
    dataType: "html",
    success: function(data) {
      var data = JSON.parse(data);
      if (data.error_code === 0) {
        DATA.uid = data.data.uid;
      }
    }
  })
}





