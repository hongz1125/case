var DATA = {};


DATA.API = {
  // getLogin: "http://test.com/api.com/dz_login.js",
  // getMoney: "http://test.com/api.com/dz_money.js",
  // getNologinMoney: "http://test.com/api.com/dz_success.js"
  getLogin: "https://m.qyer.com/plan/require/bomb.php?action=islogin",
  getMoney: "https://m.qyer.com/plan/require/bomb.php?action=ajaxadd&money=",
  getNologinMoney: "https://m.qyer.com/plan/require/bomb.php?action=jumpadd&money="
}

DATA.EventName = "";
DATA.uid = 0; //写入登陆状态
DATA.music = 0; //默认音乐关闭
DATA.baseTime = 12; //游戏时间
DATA.baseMoney = 0; //游戏初始礼金
DATA.getMoney = 0; //游戏获得礼金

DATA.baseMaxMoney = 9999; //最多金币数量
DATA.baseGiftBetween = 60; //礼盒间距需 要能被720整除
DATA.baseDropSpeed = 10; //物体下落速度

DATA.imgStaticUrl = "https://static.qyer.com/static/plan/img/events/20160113_baobao/";

//图片、音效 数据
DATA.imagesLoadAry = [{
  type: 'img',
  name: 'load_bg',
  src: DATA.imgStaticUrl + "dz-load-bg.png"
}, {
  type: 'img',
  name: 'load_person',
  src: DATA.imgStaticUrl + "dz-load-person.png"
}];


DATA.imagesAry = [{
    type: 'img',
    name: 'bg',
    src: DATA.imgStaticUrl + 'dz-bg.png'
  }, {
    type: 'img',
    name: 'learn_time',
    src: DATA.imgStaticUrl + 'dz-learn-time.png'
  }, {
    type: 'img',
    name: 'learn_clock',
    src: DATA.imgStaticUrl + 'dz-learn-clock.png'
  }, {
    type: 'img',
    name: 'learn_bomb',
    src: DATA.imgStaticUrl + 'dz-learn-bomb.png'
  }, {
    type: 'img',
    name: 'learn_gift',
    src: DATA.imgStaticUrl + 'dz-learn-gift.png'
  }, {
    type: 'img',
    name: 'learn_pop',
    src: DATA.imgStaticUrl + 'dz-learn-pop.png'
  }, {
    type: 'img',
    name: 'learn_btn',
    src: DATA.imgStaticUrl + 'dz-learn-btn.png'
  }, {
    type: 'img',
    name: 'music_btn',
    src: DATA.imgStaticUrl + 'dz-music-btn.png'
  },






  {
    type: 'img',
    name: 'play_bg',
    src: DATA.imgStaticUrl + 'dz-play-bg.png'
  }, {
    type: 'img',
    name: 'play_pop',
    src: DATA.imgStaticUrl + 'dz-play-pop.png'
  }, {
    type: 'img',
    name: 'play_gift',
    src: DATA.imgStaticUrl + 'dz-play-gift.png'
  }, {
    type: 'img',
    name: 'play_tip',
    src: DATA.imgStaticUrl + 'dz-play-tip.png'
  }, {
    type: 'img',
    name: 'play_money',
    src: DATA.imgStaticUrl + 'dz-play-money.png'
  }, {
    type: 'img',
    name: 'play_time',
    src: DATA.imgStaticUrl + 'dz-play-time.png'
  },



  //结果部分
  {
    type: 'img',
    name: 'suc_empty',
    src: DATA.imgStaticUrl + 'dz-suc-empty.png'
  }, {
    type: 'img',
    name: 'suc_bomb',
    src: DATA.imgStaticUrl + 'dz-suc-bomb.png'
  }, {
    type: 'img',
    name: 'suc_bomb01',
    src: DATA.imgStaticUrl + 'dz-suc-bomb01.png'
  }, {
    type: 'img',
    name: 'suc_share',
    src: DATA.imgStaticUrl + 'dz-suc-share.png'
  }, {
    type: 'img',
    name: 'suc_login',
    src: DATA.imgStaticUrl + 'dz-suc-login.png'
  }, {
    type: 'img',
    name: 'suc_nologin',
    src: DATA.imgStaticUrl + 'dz-suc-nologin.png'
  }, {
    type: 'img',
    name: 'suc_bg00',
    src: DATA.imgStaticUrl + 'dz-suc-bg00.png'
  }, {
    type: 'img',
    name: 'suc_bg01',
    src: DATA.imgStaticUrl + 'dz-suc-bg01.png'
  }, {
    type: 'img',
    name: 'suc_bg02',
    src: DATA.imgStaticUrl + 'dz-suc-bg02.png'
  }
  //音乐部分
  , {
    type: 'audio',
    name: 'music_bg',
    src: DATA.imgStaticUrl + 'music-bg.mp3'
  }, {
    type: 'audio',
    name: 'music_bomb',
    src: DATA.imgStaticUrl + 'music-bomb.mp3'
  }, {
    type: 'audio',
    name: 'music_eat',
    src: DATA.imgStaticUrl + 'music-eat.mp3'
  }, {
    type: 'audio',
    name: 'music_win',
    src: DATA.imgStaticUrl + 'music-win.mp3'
  }


];


for (var i = 0; i < 17; i++) {
  var json = {};
  json.type = "img";
  json.name = "suc_" + (i + 1);
  json.src = DATA.imgStaticUrl + "suc_" + (i + 1) + ".png";
  DATA.imagesAry.push(json);
}

//礼盒类型
DATA.giftRate = [{
  type: 1,
  typeName: "小玉米",
  rate: .3,
  w: 25,
  h: 25,
  sx: 0,
  sy: 0,
  sw: 120,
  sh: 120
}, {
  type: 2,
  typeName: "大玉米",
  rate: .75,
  w: 44,
  h: 44,
  sx: 0,
  sy: 120,
  sw: 120,
  sh: 120
}, {
  type: 3,
  typeName: "时间",
  rate: .85,
  w: 50,
  h: 50,
  sx: 0,
  sy: 240,
  sw: 120,
  sh: 120
}, {
  type: 4,
  typeName: "炸弹",
  rate: 1,
  w: 50,
  h: 50,
  sx: 0,
  sy: 360,
  sw: 120,
  sh: 120
}];


//接到礼物 提示数据
DATA.giftTip = [{
  w: 24,
  h: 16,
  sx: 0,
  sy: 0,
  sw: 150,
  sh: 75
}, {
  w: 24,
  h: 16,
  sx: 0,
  sy: 100,
  sw: 150,
  sh: 75
}, {
  w: 24,
  h: 16,
  sx: 0,
  sy: 200,
  sw: 150,
  sh: 75
}];


//游戏时间 绘制 json
DATA.playTimeData = [];
for (var i = 0; i <= 9; i++) {
  var json = {};
  json.x = 80;
  json.y = 39;
  json.w = 28;
  json.h = 33;
  json.sx = 0;
  json.sy = i * 100;
  json.sw = 40;
  json.sh = 50;
  json.btween = 20;
  DATA.playTimeData.push(json)
}

//游戏金额 绘制 json
DATA.playMoneyData = [];
for (var i = 0; i <= 9; i++) {
  var json = {};
  json.x = 260;
  json.y = 44;
  json.w = 16;
  json.h = 22;
  json.sx = 0;
  json.sy = i * 100;
  json.sw = 24;
  json.sh = 33;
  json.btween = 14;
  DATA.playMoneyData.push(json);
}
//loading 红人
DATA.loadPersonData = [];
for (var i = 0; i < 4; i++) {
  var json = {};
  json.x = 190;
  json.y = 237;
  json.w = 100;
  json.h = 120;
  json.sx = 0;
  json.sy = i * 200;
  json.sw = 133;
  json.sh = 158;
  DATA.loadPersonData.push(json);
}
//loading 绿人
DATA.loadPerson2Data = [];
for (var i = 0; i < 4; i++) {
  var json = {};
  json.x = 190;
  json.y = 237;
  json.w = 100;
  json.h = 120;
  json.sx = 200;
  json.sy = i * 200;
  json.sw = 133;
  json.sh = 158;
  DATA.loadPerson2Data.push(json);
}


//按钮对象
DATA.btnData = {
  w: 162,
  h: 66
}
