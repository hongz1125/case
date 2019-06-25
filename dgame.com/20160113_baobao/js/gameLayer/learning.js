function learningLayer() {
  //设置游戏状态
  APP.state = 'learning';
  //创建图层
  var div = APP.addDiv('learning');
  //创建总背景
  var bg = div.addSprite('bg');
  bg.painter.paint = function(s) {
    s
      .drawImage(
        APP.img["bg"],
        0,
        0,
        APP.w,
        APP.h
      )
      .save()
      .fillStyle("#000")
      .globalAlpha(".8")
      .fillRect(0, 0, APP.w, APP.h)
      .restore();
  };
  //创建闹钟说明
  var learnClock = div.addSprite('learn_clock');
  learnClock.x = 254;
  learnClock.y = 78;
  learnClock.w = 156;
  learnClock.h = 148;
  learnClock.img = APP.img["learn_clock"];
  learnClock.i = 0;
  learnClock.painter.paint = function(s) {
    s
      .save()
      .translate(s.x + s.w / 2, s.y + s.h / 2)
      .globalAlpha(s.i)
      .drawImage(
        s.img, -s.w / 2, -s.h / 2,
        s.w,
        s.h
      )
      .restore();
  };
  learnClock.behaviors["show"] = {};
  learnClock.behaviors["show"].lastTime = APP.time + 200;
  learnClock.behaviors["show"].spaceTime = 80;
  learnClock.behaviors["show"].actioning = 1;
  learnClock.behaviors["show"].t = 0;
  learnClock.behaviors["show"].execute = function(s) {
    doLeaningAni(s, this);
  };
  //创建时间说明
  var learnTime = div.addSprite('learn_time');
  learnTime.x = 39;
  learnTime.y = 52;
  learnTime.w = 126;
  learnTime.h = 142;
  learnTime.img = APP.img["learn_time"];
  learnTime.i = 0;
  learnTime.painter.paint = function(s) {
    s
      .save()
      .translate(s.x + s.w / 2, s.y + s.h / 2)
      .globalAlpha(s.i)
      .drawImage(
        s.img, -s.w / 2, -s.h / 2,
        s.w,
        s.h
      )
      .restore();
  };
  learnTime.behaviors["show"] = {};
  learnTime.behaviors["show"].lastTime = APP.time + 1200;
  learnTime.behaviors["show"].spaceTime = 80;
  learnTime.behaviors["show"].actioning = 1;
  learnTime.behaviors["show"].t = 0;
  learnTime.behaviors["show"].execute = function(s) {
    doLeaningAni(s, this);
  };

  //创建炸弹说明
  var learnBomb = div.addSprite('learn_bomb');
  learnBomb.x = 174;
  learnBomb.y = 249;
  learnBomb.w = 244;
  learnBomb.h = 106;
  learnBomb.img = APP.img["learn_bomb"];
  learnBomb.i = 0;
  learnBomb.painter.paint = function(s) {
    s
      .save()
      .translate(s.x + s.w / 2, s.y + s.h / 2)
      .globalAlpha(s.i)
      .drawImage(
        s.img, -s.w / 2, -s.h / 2,
        s.w,
        s.h
      )
      .restore();
  };
  learnBomb.behaviors["show"] = {};
  learnBomb.behaviors["show"].lastTime = APP.time + 2200;
  learnBomb.behaviors["show"].spaceTime = 80;
  learnBomb.behaviors["show"].actioning = 1;
  learnBomb.behaviors["show"].t = 0;
  learnBomb.behaviors["show"].execute = function(s) {
    doLeaningAni(s, this);
  };

  //创建玉米说明
  var learnGift = div.addSprite('learn_gift');
  learnGift.x = 39;
  learnGift.y = 377;
  learnGift.w = 145;
  learnGift.h = 148;
  learnGift.img = APP.img["learn_gift"];
  learnGift.i = 0;
  learnGift.painter.paint = function(s) {
    s
      .save()
      .translate(s.x + s.w / 2, s.y + s.h / 2)
      .globalAlpha(s.i)
      .drawImage(
        s.img, -s.w / 2, -s.h / 2,
        s.w,
        s.h
      )
      .restore();
  };
  learnGift.behaviors["show"] = {};
  learnGift.behaviors["show"].lastTime = APP.time + 3200;
  learnGift.behaviors["show"].spaceTime = 80;
  learnGift.behaviors["show"].actioning = 1;
  learnGift.behaviors["show"].t = 0;
  learnGift.behaviors["show"].execute = function(s) {
    doLeaningAni(s, this);
  };

  //创建爆米花说明
  var learnPop = div.addSprite('learn_pop');
  learnPop.x = 160;
  learnPop.y = 452;
  learnPop.w = 233;
  learnPop.h = 268;
  learnPop.maxX = 200;
  learnPop.minX = 100;
  learnPop.i = 0;
  learnPop.img = APP.img["learn_pop"];
  learnPop.painter.paint = function(s) {
    s
      .save()
      .translate(s.x + s.w / 2, s.y + s.h / 2)
      .globalAlpha(s.i)
      .drawImage(
        s.img, -s.w / 2, -s.h / 2,
        s.w,
        s.h
      )
      .restore();
  };
  learnPop.behaviors["show"] = {};
  learnPop.behaviors["show"].lastTime = APP.time + 4200;
  learnPop.behaviors["show"].spaceTime = 80;
  learnPop.behaviors["show"].actioning = 1;
  learnPop.behaviors["show"].t = 0;
  learnPop.behaviors["show"].execute = function(s) {
    doLeaningAni(s, this);
  };
  learnPop.behaviors["move"] = {};
  learnPop.behaviors["move"].lastTime = APP.time + 4300;
  learnPop.behaviors["move"].spaceTime = 1;
  learnPop.behaviors["move"].actioning = 1;
  learnPop.behaviors["move"].direction = 1;
  learnPop.behaviors["move"].execute = function(s) {
    var _this = this;
    s.x += _this.direction;
    if (s.x > s.maxX) {
      _this.direction = -1;
    }
    if (s.x < s.minX) {
      _this.direction = 1;
    }
  };


  //创建开始按钮
  var btn = div.addSprite('btn');
  btn.x = 290;
  btn.y = 395;
  btn.w = 160;
  btn.h = 65;
  btn.i = 0;
  btn.img = APP.img["learn_btn"];
  btn.painter.paint = function(s) {
    s
      .save()
      .globalAlpha(s.i / 10)
      .translate(s.x + s.w / 2, s.y + s.h / 2)
      .drawImage(
        s.img, -s.w / 2, -s.h / 2,
        s.w,
        s.h
      )
      .restore();
  };
  btn.behaviors["show"] = {};
  btn.behaviors["show"].lastTime = APP.time + 5200;
  btn.behaviors["show"].spaceTime = 1;
  btn.behaviors["show"].actioning = 1;
  btn.behaviors["show"].execute = function(s) {
    doLeaningAni(s, this);
  };

  div.initStart = function() {
    setTimeout(function() {
      $(APP.dom).on("touchstart.learning", function(e) {
        var isTouch = btn.isTouch(getTouchCanvasPlace(e, SIZE));
        
        if (isTouch) { //开始按钮
          playingLayer();
          doTrackCode('mplan-baobao-start');
          
        }
      });
    }, 2800)
  };
  div.initEnd = function() {
    $(APP.dom).off(".learning");
  };
  div.initStart();
  // console.log("调试 跳过learning");
  // playingLayer();

}

function loadImgReady(json) {
  APP.beforeImg = json;
  loadingLayer(); //运行loading层
  getImagesLoading(DATA.imagesAry, AllImgReady, AllImgCenter);
}

function doLeaningAni(s, _this) {
  s.i = Math.round($.easing.easeOutQuint(null, _this.t, 0, 1, 50) * 100) / 100;
  if (s.i >= 1) _this.actioning = 0;
  _this.t++;
}




