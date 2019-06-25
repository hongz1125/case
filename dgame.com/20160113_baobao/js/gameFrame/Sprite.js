/*
 * 精灵类 
 * */
function Sprite() {
  var self = this;

  self.name = undefined;
  self.behaviors = {};
  self.painter = {};


  self.x = 0;
  self.y = 0;
  self.w = 10;
  self.h = 10;

  // self.sx = 0;
  // self.sy = 0;
  // self.sw = self.w;
  // self.sh = self.h;

  self.visible = 1;
  self.animating = 0;

  self.behaviors.lastTime = 0;
  self.behaviors.spaceTime = 1;
  self.behaviors.actioning = 0;
  return self;
}
Sprite.prototype.paint = function() {
  var self = this;
  if (self.painter.paint != undefined && self.visible) {
    self.painter.paint(self);
  }
};

Sprite.prototype.update = function() {
  var self = this;
  for (var i in self.behaviors) {
    var _this = self.behaviors[i];
    //判断判断动作是否打开 间隔时间是否合适
    if (_this.actioning && self.body.time - _this.lastTime > _this.spaceTime) {
      _this.execute(self);
      _this.lastTime = self.body.time;
    }
  }
};


//判断精灵是否被点击
Sprite.prototype.isTouch = function(place) {
  var _this = this;
  if (!_this.visible) return false; //判断是否可见
  var x1 = place.x;
  var y1 = place.y;
  var x2 = _this.x;
  var y2 = _this.y;
  var w2 = _this.w;
  var h2 = _this.h;
  var hit = isCollisionWithRegion(x1, y1, x2, y2, w2, h2);
  return hit;
};


// 图像绘制器
var ImagePainter = function(imageDom) {
  var self = this;
  self.image = imageDom;
}
ImagePainter.prototype.paint = function(sprite) {
  var self = this;
  if (self.image.complete) {
    sprite.ctx.drawImage(
      self.image,
      sprite.x,
      sprite.y,
      sprite.w,
      sprite.h
    );
  }
};

/*
 * 精灵表绘制 cells = [ {x:0,y:0,w:0,h:0} ];
 */
var SpriteSheetPainter = function(imageDom, cells) {
  var self = this;
  self.image = imageDom;
  self.cells = cells || [];
  self.cellIndex = 0;
}
SpriteSheetPainter.prototype.advance = function(num) {
  var self = this;
  if (self.cellIndex == this.cells.length - 1) {
    self.cellIndex = 0;
  } else {
    self.cellIndex++;
  }
}
SpriteSheetPainter.prototype.paint = function(sprite) {
  var self = this;
  var cell = self.cells[self.cellIndex];
  sprite.ctx.drawImage(self.image, cell.sx, cell.sy, cell.sw, cell.sh,
    cell.x, cell.y, cell.w, cell.h);
}






//精灵封装 绘制图像 方法
Sprite.prototype.drawImage = function(image, sx, sy, sw, sh, x, y, w, h) {
  var _this = this;
  if (image.complete) {
    if (x !== undefined) { //判断是否需要定位的绘图
      _this.ctx.drawImage(
        image,
        sx,
        sy,
        sw,
        sh,
        x,
        y,
        w,
        h
      );
    } else {
      _this.ctx.drawImage(
        image,
        sx,
        sy,
        sw,
        sh
      );
    }
  }
  return _this;
}


//矩形写入
Sprite.prototype.fillRect = function(x, y, w, h) {
    var self = this;
    self.ctx.fillRect(x, y, w, h);
    return self;
  }
  //文本写入
Sprite.prototype.fillText = function(txt,x,y) {
    var self = this;
    self.ctx.fillText(txt,x,y);
    return self;
  }
  //文本字体大小
Sprite.prototype.font = function(txt) {
    var self = this;
    self.ctx.font = txt;
    return self;
  }
  //文本颜色
Sprite.prototype.fillStyle = function(txt) {
    var self = this;
    self.ctx.fillStyle = txt;
    return self;
  }
  //文本水平对齐
Sprite.prototype.textAlign = function(txt) {
  var self = this;
  self.ctx.textAlign = txt;
  return self;
};
//文本垂直对齐
Sprite.prototype.textBaseline = function(txt) {
  var self = this;
  self.ctx.textBaseline = txt;
  return self;
};



//设置透明度
Sprite.prototype.globalAlpha = function(num) {
  var self = this;
  self.ctx.globalAlpha = num;
  return self;
}

//保存设置
Sprite.prototype.save = function() {
    var self = this;
    self.ctx.save();
    return self;
  }
  //还原设置
Sprite.prototype.restore = function() {
  var self = this;
  self.ctx.restore();
  return self;
}



//线段部分
Sprite.prototype.moveTo = function(x, y) {
  var self = this;
  self.ctx.moveTo(x, y);
  return self;
}

Sprite.prototype.lineTo = function(x, y) {
  var self = this;
  self.ctx.lineTo(x, y);
  return self;
}
Sprite.prototype.strokeStyle = function(txt) {
  var self = this;
  self.ctx.strokeStyle = txt;
  return self;
}
Sprite.prototype.stroke = function(x, y) {
  var self = this;
  self.ctx.stroke();
  return self;
}


Sprite.prototype.beginPath = function() {
  var self = this;
  self.ctx.beginPath();
  return self;
}
Sprite.prototype.closePath = function() {
    var self = this;
    self.ctx.closePath();
    return self;
  }
  //绘制图片

//画布重映射
Sprite.prototype.translate = function(x, y) {
    var self = this;
    self.ctx.translate(x, y);
    return self;
  }
  //旋转画布
Sprite.prototype.rotate = function(radian) {
  var self = this;
  self.ctx.rotate(radian);
  return self;
}

//放大或缩小
Sprite.prototype.scale = function(scalewidth,scaleheight){
	var self = this;
	self.ctx.scale(scalewidth,scaleheight);
	return self;
}
