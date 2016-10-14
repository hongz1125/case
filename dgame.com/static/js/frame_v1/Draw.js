

/*--------------------------------------------精灵方法

*/


//矩形写入
Sprite.prototype.fillRect = function(){
	var self = this;
	self.ctx.fillRect(self.x,self.y,self.width,self.height);
	return self;
}
//文本写入
Sprite.prototype.fillText = function(txt){
	var self = this;
	self.ctx.fillText(txt,self.x+self.width/2,self.y+self.height/2);
	return self;
}
//文本字体大小
Sprite.prototype.font = function(txt){
	var self = this;
	self.ctx.font = txt;
	return self;
}
//文本颜色
Sprite.prototype.fillStyle = function(txt){
	var self = this;
	self.ctx.fillStyle = txt;
	return self;
}
//文本水平对齐
Sprite.prototype.textAlign = function(txt){
	var self = this;
	self.ctx.textAlign = txt;
	return self;
};
//文本垂直对齐
Sprite.prototype.textBaseline = function(txt){
	var self = this;
	self.ctx.textBaseline = txt;
	return self;
};



//线段部分
Sprite.prototype.moveTo = function(x,y){
	var self = this;
	self.ctx.moveTo(x,y);
	return self;
}

Sprite.prototype.lineTo = function(x,y){
	var self = this;
	self.ctx.lineTo(x,y);
	return self;
}
Sprite.prototype.strokeStyle = function(txt){
	var self = this;
	self.ctx.strokeStyle = txt;
	return self;
}
Sprite.prototype.stroke = function(x,y){
	var self = this;
	self.ctx.stroke();
	return self;
}


Sprite.prototype.beginPath = function(){
	var self = this;
	self.ctx.beginPath();
	return self;
}
Sprite.prototype.closePath = function(){
	var self = this;
	self.ctx.closePath();
	return self;
}



//画布重映射
Sprite.prototype.translate = function(x,y){
	var self = this;
	self.ctx.translate(x,y);
	return self;
}



