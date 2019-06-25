function playingLayer() {

  //设置游戏状态
  APP.state = 'playing';

  //创建图层
  var div = APP.addDiv('playing');



  //音效
  div.musicBg = APP.img["music_bg"];
  div.musicBg.loop = true;
  div.musicEat = APP.img["music_eat"];

  //创建总背景
  var bg = div.addSprite('bg');
  bg.time = DATA.baseTime;
  bg.money = DATA.baseMoney;
  bg.bgImg = APP.img["play_bg"];
  bg.timeImg = APP.img['play_time'];
  bg.moneyImg = APP.img['play_money'];
  bg.painter.paint = function(s) {
    var time = s.time;
    var money = s.money;
    s
      .save()
      .drawImage( //绘制背景
        s.bgImg,
        0,
        0,
        APP.w,
        APP.h
      )
      .restore();
    //绘制时间
    numTimeDraw(s,s.time,s.timeImg,DATA.playTimeData);
    //绘制金额
    numTimeDraw(s,s.money,s.moneyImg,DATA.playMoneyData);

  };
  bg.behaviors["time"] = {};
  bg.behaviors["time"].lastTime = new Date().getTime();
  bg.behaviors["time"].spaceTime = 1000;
  bg.behaviors["time"].actioning = 1;
  bg.behaviors["time"].execute = function(s) {
    var _this = this;
      s.time--;
      if (s.time === 0) { //判断时间为零
        if (s.money === 0) {
          div.initEnd();
          sucEmptyLayer();
          return;
        }
        div.initEnd();
        winningLayer(div.find("pop"));
        return;
      }
  };

  //创建音乐ico
  var music = div.addSprite('music');
  music.x = 400;
  music.y = 20;
  music.w = 60;
  music.h = 60;
  music.img = APP.img["music_btn"];
  music.painter.paint = function(s) {
    s.save()
      .translate(s.x, s.y)
      .drawImage(
        s.img,
        0,
        50*DATA.music,
        50,
        50,
        13,
        13,
        34,
        34
      )
      .restore();
  };


  //创建爆米花
  var pop = div.addSprite('pop');
  pop.x = 170;
  pop.y = 586;
  pop.w = 135;
  pop.h = 56;
  pop.img = APP.img["play_pop"];
  pop.painter.paint = function(s) {
    s.save()
      .translate(s.x, s.y)
      .drawImage(
        s.img,
        -14,
        -20,
        164,
        153
      )
      .restore();
  };

  //礼物数组
  div.giftAry = setGiftAry(DATA.baseGiftBetween);
  var gift = div.addSprite('gift');
  gift.image = APP.img["play_gift"];
  gift.dropSpeed = DATA.baseDropSpeed;
  gift.between = APP.h / DATA.baseGiftTotal;
  gift.painter.paint = function(s) {
    //循环绘制每个礼盒
    _.each(div.giftAry, function(item) {
      s.save()
        .translate(item.x + item.w / 2, item.y + item.h / 2)
        .rotate(item.rotate)
        .drawImage( //绘制礼盒
          s.image,
          item.sx,
          item.sy,
          item.sw,
          item.sh, -item.sw / SIZE.rateD / 2, -item.sh / SIZE.rateD / 2,
          item.sw / SIZE.rateD,
          item.sh / SIZE.rateD
        )
        .restore();
    });
  };
  //精灵循环方法 APP.childDiv.playing.childSprite.gift
  gift.behaviors["drop"] = {};
  gift.behaviors["drop"].lastTime = 0;
  gift.behaviors["drop"].spaceTime = 20;
  gift.behaviors["drop"].actioning = 1;
  gift.behaviors["drop"].execute = function(s) {
    var _this = this;
      s.dropSpeed = Math.floor(bg.money/50) + DATA.baseDropSpeed;
      _.each(div.giftAry, function(o) {
        o.y += gift.dropSpeed;
        //判断是否碰到礼物
        if (doHitGift(s, o)) {
          return false;
        }

        //判断掉出屏幕
        if (o.y > APP.h) {
          var y = o.y - APP.h - DATA.baseGiftBetween;
          _.extend(o, setGiftObj(o.y))
          o.y = y;
        }
      });
  };



  div.initStart = function() {

    APP.find("learning").initEnd();
    DATA.music && div.musicBg.play();
    $(APP.dom).on("touchstart.playing", {
      sprite: pop,
      music:music,
      musicBg:div.musicBg
    }, eventStartPop);
    $(APP.dom).on("touchmove.playing", {
      sprite: pop
    }, eventMovePop);
    $(APP.dom).on("touchend.playing", {
      sprite: pop
    }, eventEndPop);
  };
  div.initStart();
  div.initEnd = function() {
    DATA.music && div.musicBg.pause();
    $(APP.dom).off(".playing");
  }
}


//爆米花 事件
//touchstart pop
function eventStartPop(e) {
  DATA.EventName = "playing";
  var place = getTouchCanvasPlace(e, SIZE);
  var s = e.data.sprite;

  var isTouch = e.data.music.isTouch(place);
  if (isTouch) { //开始按钮
    if(DATA.music){
      DATA.music = 0;
      e.data.musicBg.pause();
    }else{
      DATA.music = 1;
      e.data.musicBg.play();
    }
  }

  s.startEX = place.x;
  s.startX = s.x;
  return;
}
//touchmove pop
function eventMovePop(e) {
  if(DATA.EventName !== "playing") return;
  var place = getTouchCanvasPlace(e, SIZE);
  var s = e.data.sprite;
  var max = APP.w - s.w;
  s.x = s.startX + place.x - s.startEX;
  if (s.x <= 0) { //判断小于左侧
    s.x = s.startX = 0;
    s.startEX = place.x;
  }
  if (s.x >= max) { //判断大于右侧
    s.x = s.startX = max;
    s.startEX = place.x;
  }
  return;
}
//touchend pop
function eventEndPop(e) {
  DATA.EventName = "";
  return;
}

//碰撞处理 返回bool
function doHitGift(gift, giftObj) {
  var div = gift.div,
    type = giftObj.type,
    pop = div.find('pop'),
    bg = div.find('bg'),
    hit = isCollsionWithRect(
      giftObj.x,
      giftObj.y,
      giftObj.w,
      giftObj.h,
      pop.x,
      pop.y,
      pop.w,
      pop.h
    );
  if (!hit) return false;
  switch (type) {
    case 1:
      bg.money = bg.money + 1 >= DATA.baseMaxMoney ? DATA.baseMaxMoney : bg.money + 1;
      DATA.getMoney = bg.money;
      doGiftTip(gift, giftObj); //提示结果
      if (bg.money >= DATA.baseMaxMoney) {
        div.initEnd();
        winningLayer(div.find("pop"));
      }
      break;
    case 2:
      bg.money = bg.money + 2 >= DATA.baseMaxMoney ? DATA.baseMaxMoney : bg.money + 2;
      DATA.getMoney = bg.money;
      doGiftTip(gift, giftObj); //提示结果
      if (bg.money >= DATA.baseMaxMoney) {
        div.initEnd();
        winningLayer(div.find("pop"));
      }
      break;
    case 3:
      bg.time += 2;
      doGiftTip(gift, giftObj); //提示结果
      break;
    case 4:
      div.initEnd();
      bombingLayer();
      return true;
      break;
  }
  var y = giftObj.y - APP.h - DATA.baseGiftBetween;
  _.extend(giftObj, setGiftObj(giftObj.y))
  giftObj.y = y;
  return false;
}

//获得礼物提示
function doGiftTip(gift, giftObj) {
  var div = gift.div;

  //音效
  if(DATA.music){
    div.musicEat.play();
  }


  //创建提示精灵 唯一命名
  var tip = div.addSprite('tip_' + _.indexOf(div.giftAry, giftObj));
  tip.x = giftObj.x;
  tip.y = giftObj.y;
  tip.type = giftObj.type - 1;
  tip.changeVal = 0;
  tip.painter.paint = function(s) {
    var img = APP.img["play_tip"];
    var data = DATA.giftTip[s.type];
    s.save()
      .translate(s.x-s.changeVal*20, s.y-s.changeVal*100)
      .scale(s.changeVal*3,s.changeVal*3)
      .globalAlpha(s.changeVal*.9)
      .drawImage(
        img,
        data.sx,
        data.sy,
        data.sw,
        data.sh,
        0,
        0,
        data.w,
        data.h
      )
      .restore();
  }
  tip.behaviors["toHide"] = {};
  tip.behaviors["toHide"].lastTime = 0;
  tip.behaviors["toHide"].spaceTime = 0;
  tip.behaviors["toHide"].actioning = 1;
  tip.behaviors["toHide"].t = 0;
  tip.behaviors["toHide"].execute = function(s) {
      var _this = this;
      s.changeVal = Math.round($.easing.easeOutCirc(null, _this.t, 0, 1, 30) * 100) / 100;
      if (_this.t  === 30) {
        _this.actioning = 0;
        s.div.removeSprite(s.name);
      }
      _this.t++;
  };
}



//生成根据礼物间距 返回礼物数组
function setGiftAry(between) {
  var ary = [];
  var len = APP.h / between;
  for (var i = 0; i <= len; i++) {
    ary.push(setGiftObj(i * between - APP.h - between)); //减掉一个礼物高度
  }
  return ary;
}
//生成单个礼物对象 返回新随机礼物json对象
function setGiftObj(y) {
  var obj = {}
  var objType = getRandomRate(DATA.giftRate);
  _.extend(obj, objType);
  obj.x = (APP.w - 40) * Math.random(); //减40防止随机数 溢出 右侧
  obj.rotate = 2 * Math.random() * Math.PI;
  obj.y = y; //写入传入的y轴
  return obj;
}
//根据概率返回命中类型对象
function getRandomRate(rate) {
  var random = Math.random();
  for (var i in rate) {
    if (random < rate[i].rate) {
      return rate[i];
    };
  }
}
//给数字绘制时间
function numTimeDraw(s,num,img,imgJson){
  var ary = (String(num)).split("");
  var len = ary.length;
  for(var i in ary){
    var j = imgJson[ary[i]];
    s
      .save()
      .drawImage(
        img,
        j.sx,
        j.sy,
        j.sw,
        j.sh,
        j.x - (len-i)*j.btween,
        j.y,
        j.w,
        j.h
      )
      .restore();
  }
}

