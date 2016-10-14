






var body = new Body("jump");
var ctx = body.ctx;
var SIZE = getSize(960, 640, 800, 480);

// 游戏比率设置
body.dom.style.width = SIZE.browserWidth + "px";// 写入独立像素
body.dom.style.height = SIZE.browserHeight + "px";
body.width = body.dom.width = 800;// 写入物理像素
body.height = body.dom.height = 480;

console.log(SIZE)

// 创建图像数组
var imageAry = [ {
	id : "bg1",
	src : "static/images/jump/jj_1.png"
}, {
	id : "bg2",
	src : "static/images/jump/jj_2.png"
}, {
	id : "bg3",
	src : "static/images/jump/jj_3.png"
}, {
	id : "footer",
	src : "static/images/jump/jj_4.png"
}, {
	id : "play",
	src : "static/images/jump/g1.png"
}, {
	id : "people",
	src : "static/images/jump/jj_5.png"
}, {
	id : "contUp",
	src : "static/images/jump/jj_6.png"
},{
	id : "contFire",
	src : "static/images/jump/jj_6_2.png"
}, {
	id : "restart",
	src : "static/images/jump/jj_7.png"
}, {
	id : "parse",
	src : "static/images/jump/jj_8.png"
}

];

// 禁用页面滚动条
document.body.addEventListener('touchmove', function(event) {
	event.preventDefault();
}, false);

// loading界面
imgLoad({
	imageAry : imageAry,
	callCenter : gameLoader,
	callReady : gameReady
});

// 游戏读取层
function gameLoader(i, j) {
	// 注册层,精灵
	var div = body.addDiv("loadingDiv");
	var S_background = div.addSprite("background");
	var S_text = div.addSprite("text");

	S_background.x = 0;
	S_background.y = 0;
	S_background.width = body.width;
	S_background.height = body.height;
	S_background.painter.paint = function(sprite) {
		sprite.fillStyle("#000000").fillRect();
	};

	S_text.left = 0;
	S_text.top = 0;
	S_text.width = body.width;
	S_text.height = body.height;
	S_text.painter.paint = function(sprite) {
		ctx.save();
		sprite.fillStyle("white").textAlign("center").textBaseline("middle")
				.font(
						"bold " + SIZE.gameRate * 60 + "px/" + SIZE.gameRate
								* 150 + "px 'arial'").fillText(
						"loading file " + i + "/" + j);
		ctx.restore();
	};
	// 主层绘制
	div.childClearDraw();

}

// 开始 - 绘制 - 游戏读取完毕层
function gameReady(data) {
	body.data = data;
	// 注册层,精灵
	var div = body.addDiv("gameReadyDiv");
	var S_background = div.addSprite("background");
	var S_start = div.addSprite("start");
	S_background.x = 0;
	S_background.y = 0;
	S_background.width = body.width;
	S_background.height = body.height;
	S_background.painter.paint = function(sprite) {
		sprite.fillStyle("#08d7ff").fillRect();
	};
	S_start.painter = new ImagePainter(body.data["play"]);
	S_start.width = 180;
	S_start.height = 97;
	S_start.x = 310;
	S_start.y = 220;
	S_start.on("touchstart", startTouchStart);
	
	
	// 绘制层
	div.childClearDraw();
	
}

// 开始 - 事件
function startTouchStart(e) {
	var sprite = body.find("start");
	var x1 = e.touches[0].clientX/SIZE.rateW;
	var y1 = e.touches[0].clientY/SIZE.rateH;
	var x2 = sprite.x;
	var y2 = sprite.y;
	var w2 = sprite.width;
	var h2 = sprite.height;
	var hit = isCollisionWithRegion(x1, y1, x2, y2, w2, h2);
	if (hit) {
		sprite.off("touchstart", startTouchStart);// 取消事件
		gameStar();// 运行游戏开始
	}
}

// 游戏开始
function gameStar() {
	var div = body.addDiv("gameStarDiv");
	var S_bg1 = div.addSprite("bg1");
	var S_bg2 = div.addSprite("bg2");
	var S_bg3 = div.addSprite("bg3");
	var S_footer = div.addSprite("footer");
	var S_people = div.addSprite("people");
	var S_contUp = div.addSprite("contUp");
	var S_contFire = div.addSprite("contFire");
	var S_parse = div.addSprite("parse");
	var S_restart = div.addSprite("restart");

	var S_fps = div.addSprite("fps");

	S_bg1.painter = new ImagePainter(body.data["bg1"]);
	S_bg1.painter.pLeft1 = 0;
	S_bg1.painter.pLeft2 = 0;
	S_bg1.painter.paint = function(sprite) {
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(self.pLeft1, 4);
		sprite.ctx.globalAlpha = 0.3;
		sprite.ctx.scale(.6, .6);
		sprite.ctx.drawImage(self.image, 0, 0);
		sprite.ctx.drawImage(self.image, 1000, 0);
		sprite.ctx.drawImage(self.image, 2000, 0);
		sprite.ctx.drawImage(self.image, 3000, 0);
		sprite.ctx.restore();
		sprite.ctx.save();
		sprite.ctx.translate(self.pLeft2, 100);
		sprite.ctx.globalAlpha = 0.5;
		sprite.ctx.scale(.8, .8);
		sprite.ctx.drawImage(self.image, 0, 0);
		sprite.ctx.drawImage(self.image, 1000, 0);
		sprite.ctx.drawImage(self.image, 2000, 0);
		sprite.ctx.drawImage(self.image, 3000, 0);
		sprite.ctx.restore();
	};
	S_bg1.behaviors["action1"] = {};
	S_bg1.behaviors["action1"].actioning = 1;
	S_bg1.behaviors["action1"].execute = function(sprite) {
		sprite.painter.pLeft1 = sprite.painter.pLeft1 - .5;
		sprite.painter.pLeft2 = sprite.painter.pLeft2 - 1;
		sprite.painter.pLeft1 = sprite.painter.pLeft1 < -1000*.6 ? 0:sprite.painter.pLeft1;
		sprite.painter.pLeft2 = sprite.painter.pLeft2 < -1000*.8 ? 0:sprite.painter.pLeft2;
	};
	
	S_bg2.painter = new ImagePainter(body.data["bg2"]);
	S_bg2.width = S_bg2.painter.image.width;
	S_bg2.height = S_bg2.painter.image.height;
	S_bg2.painter.pLeft = 0;
	S_bg2.painter.paint = function(sprite) {
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(self.pLeft, 100);
		sprite.ctx.globalAlpha = 0.9;
		sprite.ctx.drawImage(self.image, sprite.width * 0, 0);
		sprite.ctx.restore();
	};
	S_bg2.behaviors["action1"] = {};
	S_bg2.behaviors["action1"].actioning = 1;
	S_bg2.behaviors["action1"].execute = function(sprite) {
		sprite.painter.pLeft = sprite.painter.pLeft - 1.5;
		sprite.painter.pLeft = sprite.painter.pLeft < -sprite.width/2 ? 0:sprite.painter.pLeft;
	};
	
	S_bg3.painter = new ImagePainter(body.data["bg3"]);
	S_bg3.width = S_bg3.painter.image.width;
	S_bg3.height = S_bg3.painter.image.height;
	S_bg3.painter.pLeft = 0;
	S_bg3.painter.paint = function(sprite) {
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(self.pLeft, 250);
		sprite.ctx.globalAlpha = .9;
		sprite.ctx.drawImage(self.image, sprite.width * 0, 0);
		sprite.ctx.restore();
	};
	S_bg3.behaviors["action1"] = {};
	S_bg3.behaviors["action1"].actioning = 1;
	S_bg3.behaviors["action1"].execute = function(sprite) {
		sprite.painter.pLeft = sprite.painter.pLeft - 2;
		sprite.painter.pLeft = sprite.painter.pLeft < -sprite.width/2 ? 0:sprite.painter.pLeft;
	};
	
	S_footer.painter = new ImagePainter(body.data["footer"]);
	S_footer.width = S_footer.painter.image.width;
	S_footer.height = S_footer.painter.image.height;
	S_footer.painter.pLeft = 0;
	S_footer.painter.paint = function(sprite) {
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(self.pLeft,380);
		sprite.ctx.drawImage(self.image,0,0);
		sprite.ctx.restore();
	};
	S_footer.behaviors["action1"] = {};
	S_footer.behaviors["action1"].actioning = 1;
	S_footer.behaviors["action1"].execute = function(sprite) {
		sprite.painter.pLeft = sprite.painter.pLeft - 2;
		sprite.painter.pLeft = sprite.painter.pLeft < -sprite.width/2 ? 0:sprite.painter.pLeft;
	};
	
	
	/*people---------------------------------------------*/
	S_people.painter = new ImagePainter(body.data["people"]);
	S_people.width = S_people.painter.image.width;
	S_people.height = S_people.painter.image.height;
	S_people.painter.pLeft = 0;
	S_people.painter.paint = function(sprite) {
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(self.pLeft,283);
		sprite.ctx.drawImage(self.image,0,0);
		sprite.ctx.restore();
	};
	
	/*/people---------------------------------------------*/

	/*control---------------------------------------------*/
	S_contUp.painter = new ImagePainter(body.data["contUp"]);
	S_contUp.width = S_contUp.painter.image.width;
	S_contUp.height = S_contUp.painter.image.height;
	S_contUp.painter.paint = function(sprite){
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(10,320);
		sprite.ctx.globalAlpha = .1;
		sprite.ctx.drawImage(self.image,0,0);
		sprite.ctx.restore();
		
	};
	S_contFire.painter = new ImagePainter(body.data["contFire"]);
	S_contFire.width = S_contFire.painter.image.width;
	S_contFire.height = S_contFire.painter.image.height;
	S_contFire.painter.paint = function(sprite){
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(640,320);
		sprite.ctx.globalAlpha = .1;
		sprite.ctx.drawImage(self.image,0,0);
		sprite.ctx.restore();
		
	};
	S_parse.painter = new ImagePainter(body.data["parse"]);
	S_parse.width = S_parse.painter.image.width;
	S_parse.height = S_parse.painter.image.height;
	S_parse.painter.paint = function(sprite){
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(700,10);
		sprite.ctx.globalAlpha = .9;
		sprite.ctx.drawImage(self.image,0,0);
		sprite.ctx.restore();
		
	};
	S_restart.painter = new ImagePainter(body.data["restart"]);
	S_restart.width = S_restart.painter.image.width;
	S_restart.height = S_restart.painter.image.height;
	S_restart.painter.paint = function(sprite){
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(750,8);
		sprite.ctx.globalAlpha = .9;
		sprite.ctx.drawImage(self.image,0,0);
		sprite.ctx.restore();
	};
	/*/control---------------------------------------------*/
	
	
	
	/*帧显示*/
	S_fps.x = 0;
	S_fps.y = 0;
	S_fps.painter.lastTime = 0;
	S_fps.painter.paint = function(sprite) {
		var self = this;
		var nowTime = (+new Date);
		var fps = countFps(nowTime,self.lastTime);
		self.lastTime = nowTime;
		sprite.ctx.save();
		sprite.fillStyle("white").textAlign("left").textBaseline("top").font("normal 20px/40px arial")
				.fillText("FPS:" + fps);
		sprite.ctx.restore();
	};
	
	//事件层
	//S_start.on("touchstart", startTouchStart);
	
	// 绘制层
	gameStarFrame();
}
function gameStarFrame() {
	if (!body.paused) {
		var div = body.find("gameStarDiv");
		div.update();
		div.childClearDraw();
		setTimeout(gameStarFrame,16);
	}
}

console.log(SIZE);
console.log(body);
