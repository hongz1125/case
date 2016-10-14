//-----------------------------------精灵事件
Sprite.prototype.on = function(type,FUN){
	var self = this;
	self.body.dom.addEventListener(type,FUN,false);
};
Sprite.prototype.off = function(type,FUN){
	var self = this;
	self.body.dom.removeEventListener(type,FUN,false);
};
