/*
 * 主画布类
 * */
function Body(id) {
	var self = this;
	self.dom = document.getElementById(id);
	self.ctx = self.dom.getContext("2d");
	self.w = self.dom.width = 480;
	self.h = self.dom.height = 720;
	self.childDiv = {};
	self.paused = 0;
	self.musiced = 0;//默认音乐关闭
	self.time = 0;
	self.fps = 1000/80;
}
Body.prototype.addDiv = function(str) {
	var self = this;
	var _s = self.childDiv[str] = new Div();
	_s.body = self;
	_s.ctx = self.ctx;
	_s.name = str;
	return _s;
}
Body.prototype.clearRect = function() {
	var self = this;
	self.ctx.clearRect(0, 0, self.dom.width, self.dom.height);
	return self;
}
// 查找子元素 包括数组
Body.prototype.find = function(name) {
	var self = this;
	for ( var i in self.childDiv) {
		var s = self.childDiv[i];
		if (i == name) {
			return s;
		} else {
			if (s && s.childSprite) {
				for ( var j in s.childSprite) {
					if (j == name) {
						return s.childSprite[j];
					}
				}
			}
		}
	}
	console.log("找不到元素: " + name);
}