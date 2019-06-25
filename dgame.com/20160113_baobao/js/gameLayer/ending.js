function winningLayer(pop) {
  //设置游戏状态
  APP.state = "winningLayer";
  //创建图层
  var div = APP.addDiv('winningLayer');
  //音效
  if (DATA.music) {
    div.music = APP.img['music_win'];
  }
  //写入传入背景
  var bg = div.addSprite('bg');
  bg.baseX = pop.x;
  bg.x = 0;
  bg.y = 0;
  bg.w = APP.w;
  bg.h = APP.h;
  bg.baseX = pop.x - 169;
  bg.addBaseX = bg.baseX / 4;
  bg.picIndex = 1;
  bg.blink = 0;
  bg.painter.paint = function(s) {
    APP.find("playing").childDraw();
    if (s.blink) {
      s
        .save()
        .drawImage(
          s.blink,
          0,
          0,
          s.w,
          s.h
        )
        .drawImage(
          APP.img["suc_bg02"],
          0, 0, s.w, s.h
        )
        .restore();
    }
    s
      .save()
      .translate(s.baseX, 0)
      .drawImage(
        s.img,
        0,
        0,
        s.w,
        s.h
      )
      .restore();

  };

  bg.behaviors["suc"] = {};
  bg.behaviors["suc"].lastTime = 0;
  bg.behaviors["suc"].spaceTime = 60;
  bg.behaviors["suc"].actioning = 1;
  bg.behaviors["suc"].i = 0;
  bg.behaviors["suc"].execute = function(s) {
    var _this = this;
    _this.i++;
    if (_this.i > 17) {
      _this.actioning = 0;
      setTimeout(function() {
        sucWinLayer(pop);
      }, 1500);
      return;
    }
    s.img = APP.img['suc_' + _this.i];
    if (_this.i < 5) {
      s.baseX = s.baseX - s.addBaseX;
    }
    if (_this.i == 11) {
      s.behaviors["blink"].actioning = 1;
    }
  };
  bg.behaviors["blink"] = {};
  bg.behaviors["blink"].lastTime = 0;
  bg.behaviors["blink"].spaceTime = 240;
  bg.behaviors["blink"].actioning = 0;
  bg.behaviors["blink"].i = 0;
  bg.behaviors["blink"].execute = function(s) {
    var _this = this;
    s.blink = APP.img["suc_bg0" + _this.i];
    _this.i = _this.i === 1 ? 0 : 1;
  };

  div.initStart = function() {
    APP.find("playing").initEnd();
    pop.visible = 0;
    DATA.music && div.music.play();
  };
  div.initStart();
}



function sucWinLayer(pop) {
  $("#wx-share-title").val("厉害了！我接到" + DATA.getMoney + "粒玉米，兑换到" + getCeilMoney(DATA.getMoney) + "代金券！你试试！");
  if (window.wx) wx.shareFun();
  //设置游戏状态
  APP.state = "sucWinLayer";
  //创建图层
  var div = APP.addDiv('sucWinLayer');


  //写入传入背景
  var bg = div.addSprite('bg');
  bg.img = DATA.uid === 0 ? APP.img['suc_nologin'] : APP.img['suc_login'];
  bg.painter.paint = function(s) {
    APP.find('playing').childDraw();
    APP.find('winningLayer').childDraw();
    s
      .save()
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
      .font("30px Arial")
      .fillStyle("#44e58c")
      .textAlign("center")
      .textBaseline("middle")
      .fillText(
        DATA.getMoney, 300, 305
      )
      .fillText(
        getCeilMoney(DATA.getMoney), 394, 350
      )
      .restore();
  };
  var baseX = DATA.uid === 0 ? 0 : 20;
  var btnLogin = div.addSprite('btnLogin');
  btnLogin.x = 46;
  btnLogin.y = 412 + baseX;
  btnLogin.w = 162;
  btnLogin.h = 66;
  var btnReplay = div.addSprite('btnReplay');
  btnReplay.x = 277;
  btnReplay.y = 412 + baseX;
  btnReplay.w = 162;
  btnReplay.h = 66;
  var btnShare = div.addSprite('btnShare');
  btnShare.x = 159;
  btnShare.y = 531 + baseX;
  btnShare.w = 162;
  btnShare.h = 66;
  div.initStart = function() {
    $(APP.dom).on("touchstart.sucEmptyLayer", function(e) {
      DATA.EventName = "success";
      var isTouchLogin = btnLogin.isTouch(getTouchCanvasPlace(e, SIZE));
      var isTouchReplay = btnReplay.isTouch(getTouchCanvasPlace(e, SIZE));
      var isTouchShare = btnShare.isTouch(getTouchCanvasPlace(e, SIZE));
      if (isTouchLogin) {

        if (DATA.uid !== 0) {
          doTrackCode('mplan-baobao-ticket-look');
          setTimeout(function() {
            window.location.href = "https://m.qyer.com/z/deal/57799/";
          }, 10);
          return;
        }
        doTrackCode('mplan-baobao-ticket-login');
        var url = "https://m.qyer.com/login/login.php?from_url=" + encodeURIComponent(DATA.API.getNologinMoney + getCeilMoney(DATA.getMoney));
        window.location.href = url;
      }
      if (isTouchReplay) {
        doTrackCode('mplan-baobao-replay');
        div.initEnd();
        playingLayer();
        gameLayerFrame();
      }
      if (isTouchShare) {
        doTrackCode('mplan-baobao-share');
        div.initEnd();
        sharingLayer(div.name);
      }
    });
  };
  div.initEnd = function() {
    $(APP.dom).off(".sucEmptyLayer");
  };
  div.initStart();

  //登陆状态下 进行一次ajax
  if (DATA.uid !== 0) {
    $.ajax({
      url: DATA.API.getMoney,
      data: {
        money: getCeilMoney(DATA.getMoney)
      },
      dataType: "html",
      success: function(data) {}
    });
  }

  //单独绘制
  setTimeout(function() {
    div.childClearDraw()
  }, 0);


}


function sucEmptyLayer() {
  //设置游戏状态
  APP.state = "sucEmptyLayer";
  //创建图层
  var div = APP.addDiv('sucEmptyLayer');
  //音效
  if (DATA.music) {
    div.music = APP.img['music_win'];
  }
  //写入传入背景
  var bg = div.addSprite('bg');
  bg.painter.paint = function(s) {
    APP.find('playing').childDraw();
    s
      .save()
      .fillStyle("#000")
      .globalAlpha(.8)
      .fillRect(0, 0, APP.w, APP.h)
      .restore()
      .save()
      .drawImage(
        APP.img['suc_empty'],
        0,
        0,
        APP.w,
        APP.h
      )
      .restore();
  };
  var btn = div.addSprite('btn');
  btn.x = 167;
  btn.y = 363;
  btn.w = 160;
  btn.h = 65;
  div.initStart = function() {
    $(APP.dom).on("touchstart.sucEmptyLayer", function(e) {
      DATA.EventName = "success";
      var isTouch = btn.isTouch(getTouchCanvasPlace(e, SIZE));
      if (isTouch) {
        doTrackCode('mplan-baobao-replay');
        div.initEnd();
        playingLayer();
        gameLayerFrame();
      }
    });
    DATA.music && div.music.play();
  };
  div.initEnd = function() {
    $(APP.dom).off(".sucEmptyLayer");
  }
  div.initStart();

  //单独绘制
  setTimeout(function() {
    div.childClearDraw();
  }, 0)
}

function bombingLayer() {
  //设置游戏状态
  APP.state = "bombingLayer";
  //创建图层
  var div = APP.addDiv('bombingLayer');
  //音效
  if (DATA.music) {
    div.music = APP.img['music_bomb'];
  }
  var bg = div.addSprite('bg');
  bg.x = -107;
  bg.y = 114;
  bg.w = 587;
  bg.h = 622;
  bg.img = APP.img["suc_bomb01"];
  bg.scaleVal = 0;
  bg.painter.paint = function(s) {
    APP.find('playing').childDraw();
    s
      .save()
      .fillStyle("#000")
      .globalAlpha(.8)
      .fillRect(0, 0, APP.w, APP.h)
      .restore()
      .save()
      .translate(s.x + s.w / 2, s.y + s.h / 2)
      .scale(s.scaleVal, s.scaleVal)
      .drawImage(
        s.img, -s.w / 2, -s.h / 2,
        s.w,
        s.h
      )
      .restore();
  };
  bg.behaviors["bomb"] = {};
  bg.behaviors["bomb"].lastTime = 0;
  bg.behaviors["bomb"].spaceTime = 1;
  bg.behaviors["bomb"].actioning = 1;
  bg.behaviors["bomb"].t = 0;
  bg.behaviors["bomb"].execute = function(s) {
    var _this = this;
    s.scaleVal = Math.round($.easing.easeOutElastic(null, _this.t, 0, 1, 20) * 100) / 100;
    if (_this.t > 20) {
      _this.actioning = 0;
      div.initEnd();
      _.delay(sucBombLayer, 1500);
    }
    _this.t++;
  };
  div.initStart = function() {
    DATA.music && div.music.play();
  };
  div.initEnd = function() {
    //div.music.pause();
  };
  div.initStart();
}


function sucBombLayer() {
  $("#wx-share-title").val("魔性小游戏，难度系数：高！");
  if (window.wx) wx.shareFun();
  //设置游戏状态
  APP.state = "sucBombLayer";
  //创建图层
  var div = APP.addDiv('sucBombLayer');

  //写入传入背景
  var bg = div.addSprite('bg');
  bg.painter.paint = function(s) {
    APP.find('playing').childDraw();
    APP.find('bombingLayer').childDraw();
    s
      .save()
      .fillStyle("#000")
      .globalAlpha(.8)
      .fillRect(0, 0, APP.w, APP.h)
      .restore()
      .save()
      .drawImage(
        APP.img['suc_bomb'],
        0,
        0,
        APP.w,
        APP.h
      )
      .restore();
  };
  var againBtn = div.addSprite('againBtn');
  againBtn.x = 75;
  againBtn.y = 363;
  againBtn.w = 162;
  againBtn.h = 66;
  var shareBtn = div.addSprite('shareBtn');
  shareBtn.x = 253;
  shareBtn.y = 363;
  shareBtn.w = 162;
  shareBtn.h = 66;
  div.initStart = function() {
    $(APP.dom).on("touchstart.sucBombLayer", function(e) {
      DATA.EventName = "success";
      var isTouch = againBtn.isTouch(getTouchCanvasPlace(e, SIZE));
      var isTouchShare = shareBtn.isTouch(getTouchCanvasPlace(e, SIZE));
      if (isTouch) {
        doTrackCode('mplan-baobao-replay');
        div.initEnd();
        playingLayer();
        gameLayerFrame();
      }
      if (isTouchShare) {
        doTrackCode('mplan-baobao-share');
        div.initEnd();
        sharingLayer(div.name);
      }
    });
  };
  div.initEnd = function() {
    $(APP.dom).off(".sucBombLayer")
  }
  div.initStart();

  //单独绘制
  setTimeout(function() {
    div.childClearDraw()
  }, 0);
}




function getCeilMoney(num) {
  var num = Math.ceil(num / 10) * 10;
  return num > 200 ? 200 : num;
}
