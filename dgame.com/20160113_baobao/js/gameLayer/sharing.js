function sharingLayer(feState) {
  APP.state = "sharingLayer";
  //创建图层
  var div = APP.addDiv('sharingLayer');
  var bg = div.addSprite('bg');
  bg.img = APP.img['suc_share'];
  bg.painter.paint = function(s) {
    APP.find("playing").childDraw();
    APP.find(feState).childDraw()
    s.save()
      .fillStyle("#000")
      .globalAlpha(.8)
      .fillRect(0, 0, APP.w, APP.h)
      .restore()
      .save()
      .drawImage(
        s.img,
        0,
        0,
        APP.w,
        APP.h
      )
      .restore();
  };
  div.initStart = function() {
    $(APP.dom).on("touchstart.sharingLayer", function() {
      APP.state = feState;
      div.initEnd();
      APP.find(feState).childClearDraw().initStart();
    });
  };
  div.initEnd = function() {
    $(APP.dom).off(".sharingLayer");
  };
  div.initStart();
  setTimeout(function() {
    div.childClearDraw();
  }, 0);
}
