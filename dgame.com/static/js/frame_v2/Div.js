/*
 * 层类
 * */
function Div() {
	var self = this;
	self.childSprite = {};
}
// 继承
Div.prototype.addSprite = function(str) {
	var self = this;
	var _s;
	_s = self.childSprite[str] = new Sprite();
	_s.body = self.body;
	_s.ctx = self.ctx;
	_s.name = str;
	return _s;
};
Div.prototype.clearRect = function(){
	var self = this;
	self.body.clearRect();
	return self;
};
Div.prototype.childDraw = function() {
	var self = this;
	var _s;
	for ( var i in self.childSprite) {
		_s = self.childSprite[i];
		_s.paint();// 绘制每个精灵到图层
	}
	return self;
};
Div.prototype.childClearDraw = function() {// 清楚画布并绘制
	var self = this;
	self.body.clearRect();
	self.childDraw();
	return self;
}

Div.prototype.update = function() {
	var self = this;
	for ( var i in self.childSprite) {
		var _s = self.childSprite[i];
		_s.update();
	}
	self.body.time++;
	return self;
}
Div.prototype.find = function(sprite) {
	var self = this;
	for ( var i in self.childSprite) {
		if (i == sprite) {
			return self.childSprite[i];
		}
	}
	return self;
}
