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
	self.width = 10;
	self.height = 10;
	self.velocityX = 0;
	self.volocityY = 0;
	self.visible = 1;
	self.animating = 0;
	
	self.behaviors.lastTime = 0;
	self.behaviors.spaceTime = 1;
	self.behaviors.actioning = 0;
}
Sprite.prototype.paint = function() {
	var self = this;
	if (self.painter.paint != undefined && self.visible) {
		self.painter.paint(self);
	}
};
Sprite.prototype.update = function() {
	var self = this;
	for ( var i in self.behaviors) {
		if (self.behaviors[i].actioning) {
			self.behaviors[i].execute(self);
		}
	}
};
// 图像绘制器
var ImagePainter = function(imageDom) {
	var self = this;
	self.image = imageDom;
}
ImagePainter.prototype.paint = function(sprite) {
	var self = this;
	if (self.image.complete) {
		sprite.ctx.drawImage(self.image, sprite.x, sprite.y, sprite.width,
				sprite.height);
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
	sprite.ctx.drawImage(self.image, cell.x, cell.y, cell.width, cell.height,
			sprite.x, sprite.y, cell.width, cell.height);
}
