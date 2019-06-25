/*
 * 定时器
 * */
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());



function pointToRect(x, y, x1, y1, x2, y2) {
  return (x1 < x && x < x2) && (y1 < y && y < y2);
}

function mouseToSprite(e, sprite) {
  var x = e.touches[0].clientX,
    y = e.touches[0].clientY,
    x1 = sprite.x,
    y1 = sprite.y,
    x2 = sprite.x + sprite.width,
    y2 = sprite.y + sprite.height;
  return (x1 < x && x < x2) && (y1 < y && y < y2);
}
/*
 * 转二维数组
 */
function dyadicArray(w, h, row, col) {
  var i, j, cw = w / col,
    ch = h / row,
    r = [],
    c;
  for (i = 0; i < row; i++) {
    c = [];
    for (j = 0; j < col; j++) {
      c.push({
        x: cw * j,
        y: ch * i,
        width: w / col,
        height: h
      });
    }
    r.push(c);
  }
  return r;
};
/*
 * 计算帧率fps
 * 
 */
function countFps(newTime, oldTime) {
  var time = newTime - oldTime;
  var fps = parseInt(1000 / time);
  return fps;
}


/**
 * 绘制网格 drawGrid(dom,rgba(128,128,128,.1),10)
 */
function drawGrid(dom, color, step) {
  var ctx = dom.getContext("2d");
  var width = dom.width;
  var height = dom.height;
  var widthStep = width / step;
  var heightStep = height / step;
  ctx.beginPath();
  for (var i = 0; i < widthStep; i++) {
    ctx.moveTo(i * step + 0.5, +0.5);
    ctx.lineTo(i * step + 0.5, height);
  }
  for (var j = 0; j < heightStep; j++) {
    ctx.moveTo(0, j * step + 0.5);
    ctx.lineTo(width + 0.5, j * step + 0.5);
  }
  ctx.strokeStyle = color;
  ctx.stroke();
}
/**
 * 获取可视高度 获取可视宽度 getSize(w,h)
 * 
 * @param w
 *            设计稿 宽
 * @param h
 *            设计稿 高
 * @param way
 *            适配方式 "rate","width" //按比率居 按宽度适配 按高度适配
 *  @param align
 *            适配方式 "center","bottom","top" //按比率居 按宽度适配 按高度适配
 * 
 */
function getSize(drawWidth, drawHeight, rateD, ctx) {
  //该方法适配按比率游戏
  var browserWidth = document.documentElement.clientWidth;
  var browserHeight = document.documentElement.clientHeight;
  var phyWidth;
  var phyHeight;

  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

  var rateRatio = devicePixelRatio / backingStorePixelRatio; //比率 像素比
  phyWidth = browserWidth * rateRatio;
  phyHeight = browserHeight * rateRatio;


  var rateX = drawWidth / browserWidth;
  var rateY = drawHeight / browserHeight;


  return {
    "rateRatio": rateRatio, // 比率 像素
    "rateX": rateX, // 比率 宽
    "rateY": rateY, // 比率 高

    "rateD": rateD, // 与设计稿比率

    "drawWidth": drawWidth, // 绘制 宽度
    "drawHeight": drawHeight, // 绘制 高度

    "browserWidth": browserWidth, // 设备 宽度
    "browserHeight": browserHeight, // 设备 高度

    "phyWidth": phyWidth, // 物理宽度
    "phyHeight": phyHeight // 物理高度
  };
}

/**
 * 碰撞部分
 */
/**
 * 坐标碰撞 isCollisionWithRegion(x1,y1,x2,y2,w2,h2)
 * 
 * @param x1
 *            鼠标X坐标
 * @param y1
 *            鼠标Y坐标
 * @param x2
 *            矩形X坐标
 * @param y2
 *            矩形Y坐标
 * @param w1
 *            矩形宽度
 * @param h1
 *            矩形高度
 */
function isCollisionWithRegion(x1, y1, x2, y2, w2, h2) {
  if (x1 < x2) {
    return false;
  } else if (x1 > x2 + w2) {
    return false;
  } else if (y1 < y2) {
    return false;
  } else if (y1 > y2 + h2) {
    return false;
  }
  return true;
}
/**
 * 矩形碰撞 isCollsionWithRect(x1, y1, w1, h1, x2, y2, w2, h2)
 * 
 * @param x1
 *            第一个矩形的X 坐标
 * @param y1
 *            第一个矩形的Y 坐标
 * @param w1
 *            第一个矩形的宽
 * @param h1
 *            第一个矩形的高
 * @param x2
 *            第二个矩形的X 坐标
 * @param y2
 *            第二个矩形的Y 坐标
 * @param w2
 *            第二个矩形的宽
 * @param h2
 *            第二个矩形的高
 * @return
 */
function isCollsionWithRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  // 当矩形1 位于矩形2 的左侧
  if (x1 >= x2 && x1 >= x2 + w2) {
    return false;
    // 当矩形1 位于矩形2 的右侧
  } else if (x1 <= x2 && x1 + w1 <= x2) {
    return false;
    // 当矩形1 位于矩形2 的上方
  } else if (y1 >= y2 && y1 >= y2 + h2) {
    return false;
    // 当矩形1 位于矩形2 的下方
  } else if (y1 <= y2 && y1 + h1 <= y2) {
    return false;
  }
  // 所有不会发生碰撞都不满足时，肯定就是碰撞了
  return true;
}

/**
 * 圆形碰撞 isCollisionWithCircle(x1, y1, r1, x2, y2, r2)
 * 
 * @param x1
 *            圆形1 的圆心X 坐标
 * @param y1
 *            圆形2 的圆心X 坐标
 * @param x2
 *            圆形1 的圆心Y 坐标
 * @param y2
 *            圆形2 的圆心Y 坐标
 * @param r1
 *            圆形1 的半径
 * @param r2
 *            圆形2 的半径
 * @return
 */
function isCollisionWithCircle(x1, y1, r1, x2, y2, r2) {
  // Math.sqrt:开平方
  // Math.pow(double x, double y): X 的Y 次方
  if (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) <= r1 + r2) {
    // 如果两圆的圆心距小于或等于两圆半径则认为发生碰撞
    return true;
  }
  return false;
}





/*
@title 动画animate.css class添加与删除 依赖animate.css
@eg
$obj.addAnimClass();
$obj.removeAnimClass();
*/
$.extend($.fn, {
  getAnimClass: function() { //拼接动画class
    var _this = this;
    var opt = {
      name: _this.attr('data-animation-name') || '',
      duration: _this.attr('data-animation-duration') || '',
      timing: _this.attr('data-animation-timing-function') || '',
      delay: _this.attr('data-animation-delay') || '',
      count: _this.attr('data-animation-iteration-count') || '',
      direction: _this.attr('data-animation-direction') || '',
      state: _this.attr('data-animation-play-state') || '',
      mode: _this.attr('data-animation-fill-mode') || ''
    };
    _this.animClass = 'animated';
    for (var i in opt) {
      if (opt[i]) {
        _this.animClass += ' ' + opt[i];
      }
    }
    return _this;
  },
  addAnimClass: function() { //添加动画class
    var _this = this;
    _this
      .getAnimClass()
      .addClass(_this.animClass);
    return _this;
  },
  removeAnimClass: function() { //移除动画class
    var _this = this;
    _this
      .getAnimClass()
      .removeClass(_this.animClass);
    return _this;
  },
  addChildAnimClass: function() { //批量添加子元素动画
    var _this = this;
    _this
      .children('.animation')
      .each(function() {
        $(this).addAnimClass();
      });
    return _this;
  },
  removeChildAnimClass: function() { //批量删除子元素动画
    var _this = this;
    _this
      .children('.animation')
      .each(function() {
        $(this).removeAnimClass();
      });
    return _this;
  }
});




//返回随机整数
function randomInt(num) {
  return Math.floor(Math.random() * num);
}



//移动端 获取点击的x,y轴
function getTouchPlace(e) {
  return {
    x: e.originalEvent.touches[0].clientX,
    y: e.originalEvent.touches[0].clientY
  }
}
//获取用户相对于canvas上的坐标
function getTouchCanvasPlace(e, size) {
  var place = getTouchPlace(e);
  return {
    x: place.x * size.rateX,
    y: place.y * size.rateY
  }
}



//前端字符串加密
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;

  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}

function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;

  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1)
      break;

    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1)
      break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1)
      break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}

function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
}
//加密使用范例
// function doit() {
//     var f = document.f
//     f.output.value = base64encode(utf16to8(f.source.value))
//     f.decode.value = utf8to16(base64decode(f.output.value))
// }


jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

window.doTrackCode = function(aCode){
  var id = '__dotarckcodebutton__';
  if( !document.getElementById(id) ){
    $('<button id="'+id+'" style="display:none;">dotarckcodebutton</button>').appendTo(document.body);
  }
  $('#'+id).attr('data-bn-ipg',aCode).trigger('click');
  id=null;
}



