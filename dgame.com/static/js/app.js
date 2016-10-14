var imageAry = [ {
	id : "sister",
	src : "static/images/sister.png"
}, {
	id : "sister2",
	src : "static/images/sister2.png"
}, {
	id : "you",
	src : "static/images/you.png"
}, {
	id : "ball",
	src : "static/images/ball.png"
}, {
	id : "demo1",
	src : "static/images/demo1.jpg"
}, {
	id : "sky",
	src : "static/images/sky.png"
}, {
	id : "tree",
	src : "static/images/tree.png"
}, {
	id : "grass",
	src : "static/images/grass.png"
} ], body;

// 初始化游戏
body = new Body("demo");

imgLoad({
	imageAry : imageAry,
	callCenter : gameLoader,
	callReady : gameReady
});

function gameLoader(i, j) {
	// 注册层,精灵
	var div = body.addDiv([ "loadingDiv" ]);
	var S_background = div.addSprite([ "background" ]);
	var S_text = div.addSprite([ "text" ]);

	S_background.x = 0;
	S_background.y = 0;
	S_background.width = body.width;
	S_background.height = body.height;
	S_background.painter.paint = function(sprite) {
		sprite.fillStyle("black").fillRect();	
	};

	S_text.left = 0;
	S_text.top = 0;
	S_text.width = body.width;
	S_text.height = body.height;
	S_text.painter.paint = function(sprite) {
		sprite.fillStyle("white").textAlign("center")
				.textBaseline("middle").font("bold 20px/40px Georgia")
				.fillText(i + "/" + j);
	};

	// 主层绘制
	div.childClearDraw();
}

function gameReady(data) {
	body.data = data;

	// 注册层,精灵
	var div = body.addDiv([ "readyDiv" ]);
	var S_background = div.addSprite([ "background" ]);
	var S_start = div.addSprite([ "start" ]);

	S_background.x = 0;
	S_background.y = 0;
	S_background.width = body.width;
	S_background.height = body.height;
	S_background.painter.paint = function(sprite) {
		sprite.fillStyle("black").fillRect();
	};
	
	S_start.width = 100;
	S_start.height = 40;
	S_start.x = body.width/2 - S_start.width/2;
	S_start.y = body.height/2 - S_start.height/2;
	S_start.painter.paint = function(sprite) {
		sprite.fillStyle("#aaa").fillRect().fillStyle("#fff").textAlign(
				"center").textBaseline("middle").fillText("开始");
	};
	S_start.on("click", startClick);
	// 绘制层
	div.childClearDraw();
}

//开始画面事件
function startClick(event) {
	var S_start = body.find("start");
	if (!mouseToSprite(event, S_start)) {
		return false;
	}
	S_start.off("click", startClick);// 取消事件
	gameStar();// 运行游戏开始
}

function gameStar() {
	// 注册层,精灵
	var div = body.addDiv([ "mainDiv" ]);
	
	var S_sky = div.addSprite([ "sky" ]);
	var S_you = div.addSprite([ "you" ]);
	var S_sister = div.addSprite([ "sister" ]);

	/*	
	var S_ball = div.addSprite([ "ball" ]);
	var S_line = div.addSprite([ "line" ]);
	var S_sky = div.addSprite([ "sky" ]);
	var S_tree = div.addSprite([ "tree" ]);
	var S_grass = div.addSprite([ "grass" ]);
	var S_showGrid = div.addSprite([ "showGrid" ]);
	var S_showFps = div.addSprite([ "showFps" ]);*/
	
	S_sister.painter = new ImagePainter(body.data.sister);
	S_sister.x = 0;
	S_sister.y = 100;
	S_sister.width = S_sister.painter.image.width;
	S_sister.height = S_sister.painter.image.height;
	
	
	
	S_you.spriteOrder = dyadicArray(1900, 100, 1, 19);
	S_you.painter = new SpriteSheetPainter(body.data.you,S_you.spriteOrder[0]);
	S_you.behaviors["action1"] = {};
	S_you.behaviors["action1"].lastTime = 0;
	S_you.behaviors["action1"].spaceTime = 10;
	S_you.behaviors["action1"].execute = function(sprite){
		var self = this;
		if(sprite.body.time - self.lastTime > self.spaceTime){
			sprite.painter.advance();
			self.lastTime = body.time;
		}
	};
	S_you.x = 0;
	S_you.y = 0;
	
	
	S_sky.painter = new ImagePainter(body.data["sky"]);
	S_sky.x = 0;
	S_sky.y = 0;
	S_sky.width = S_sky.painter.image.width;
	S_sky.height = S_sky.painter.image.height;
	S_sky.painter.offsetLeft = 0;
	S_sky.painter.paint = function(sprite){
		var self = this;
		sprite.ctx.save();
		sprite.ctx.translate(self.offsetLeft, 0);
		sprite.ctx.drawImage(self.image, 0, 0);
		sprite.ctx.drawImage(self.image, body.width, 0);
		sprite.ctx.restore();
	};
	S_sky.behaviors["action1"] = {};
	S_sky.behaviors["action1"].lastTime = 0;
	S_sky.behaviors["action1"].spaceTime = 10;
	S_sky.behaviors["action1"].execute = function(sprite){
		var self = this;
		if(sprite.body.time - self.lastTime > self.spaceTime){
			sprite.painter.offsetLeft -- ;
			if(-sprite.painter.offsetLeft > body.width){
				sprite.painter.offsetLeft = 0;
			}
		}
	};
	

	
	
/*
	// 精灵
	list = dyadicArray(1900, 100, 1, 19);
	you.dom(body.data["you"]).sx(list[0][0].x).sy(list[0][0].y).swidth(100)
			.sheight(100).x(0).y(200).width(100).height(100);
	you.addState("defaule");
	you.state["defaule"].actioning(1);
	you.state["defaule"].action = function() {
		var self = this;
		var sprite = self.sprite;
		you.dom(body.data["you"]).sx(list[0][0].x).sy(list[0][0].y).swidth(100)
				.sheight(100).x(0).y(200).width(100).height(100);
	}

	you.state["defaule"];
	you.state["defaule"].speed(3);
	you.state["defaule"].action = function() {
		var self = this;
		var sprite = self.sprite;
		var ball = body.find("ball");
		sprite.sx(list[0][self._index].x).sy(list[0][self._index].y);
		if (self._index >= 18) {
			self.actioning(0);
			self.index(0);
		} else {
			if (self._index == 12) {
				ball.state["fire"].setVelocity();
				ball.visible = 1;
				ball.state["fire"].actioning(1);
			}
		}
		self._index++;
	};

	sister.dom(body.data["sister"]).width(body.data["sister"].width).height(
			body.data["sister"].height).x(470).y(250);
	sister.paint = function() {
		this.drawImage();
	};
	sister.addState("bomb");
	sister.state["bomb"].speed(3);
	sister.state["bomb"].action = function() {

	}

	ball.dom(body.data["ball"]).width(body.data["ball"].width).height(
			body.data["ball"].height).x(42).y(244);
	ball.baseX = 42;
	ball.baseY = 244;
	ball.visible = 0;
	ball.s_pixelToMeter = 32; // px/m
	ball.s_gravity = 30; // 重力加速度 m/s
	ball.angle = 0; // 角度
	ball.wind = 0; // 风速
	ball.velocity = 0; // 发射x速度 m/s
	ball.s_velocityX = 0; // 发射x速度 m/s
	ball.s_velocityY = 0; // 发射y速度 m/s

	ball.painter = function() {
		this.drawImage();
	};
	ball.addState("fire");
	ball.state["fire"].speed(0);
	ball.state["fire"].setVelocity = function() {
		var self = this;
		var sprite = self.sprite;
		sprite.s_velocityX = Math.cos(sprite.angle * Math.PI / 180)
				* sprite.velocity * sprite.s_pixelToMeter;
		sprite.s_velocityY = Math.sin(sprite.angle * Math.PI / 180)
				* sprite.velocity * sprite.s_pixelToMeter;
	};
	ball.state["fire"].action = function() {
		var self = this;
		var sprite = self.sprite;
		sprite.s_velocityY = sprite.s_gravity + sprite.s_velocityY;
		sprite.s_velocityX = sprite.wind / 10 + sprite.s_velocityX;
		sprite.x(sprite._x + (sprite.s_velocityX / 5 / body.fps)).y(
				sprite._y + (sprite.s_velocityY / 5 / body.fps));
		self.fly();
	};
	ball.state["fire"].fly = function() {// 判断移除方法
		var self = this;
		var sprite = self.sprite;
		var sister = sprite.div.find("sister");
		var hitSprite = isCollsionWithRect(sprite._x, sprite._y, sprite._width,
				sprite._height, sister._x, sister._y, sister._width,
				sister._height);
		var hitEdge = sprite._y > 500 || sprite._x > 500 || sprite._y < -500
				|| sprite._x < -500;

		if (hitSprite) {

		}
		;
		if (hitSprite || hitEdge) {
			sprite.visible = 0;
			self.actioning(0);
			sprite.x(sprite.baseX)// 初始化球的X轴与Y轴
			.y(sprite.baseY);
			body.find("line").randomWind();// 重新随机风力
		}
	};

	line.baseX = 40;
	line.baseY = 240;
	line.angle = 0;
	line.velocity = 0;
	line.wind = Math.floor(Math.random() * 100 - 50); // 风速
	line.width(0).height(0).x(0).y(20);
	line.paint = function() {
		var self = this;
		self.moveTo(self.baseX, self.baseY).lineTo(self.lineX, self.lineY)
				.strokeStyle("#333").stroke();
		self.textAlign("left").textBaseline("top").y(20).beginPath().fillText(
				"力量:" + line.velocity) // 转成按100计算
		.y(40).beginPath().fillText("角度:" + line.angle).y(60).beginPath()
				.fillText("风力:" + line.wind);
	};
	line.addState("move");
	line.state["move"].actioning(1);
	line.state["move"].action = function() {
		var self = this;
		var sprite = self.sprite;
		// 设置线条终点
		sprite.lineX = sprite.nx + sprite.baseX;
		sprite.lineY = sprite.ny + sprite.baseY;
		// 设置力量角度
		sprite.angle = Math.floor(Math.atan(sprite.ny / sprite.nx) * 180
				/ Math.PI);
		sprite.velocity = Math.floor(line.nz * 100 / 200);
	};
	line.randomWind = function() {
		var self = this;
		self.wind = Math.floor(Math.random() * 100 - 50);
	};



	tree.dom(body.data["tree"]).x(0).y(0).width(body.data["tree"].width)
			.height(body.data["tree"].height);
	tree.offsetLeft = 0;
	tree.paint = function() {
		var self = this;
		self.translate(self.offsetLeft, 200);
		body.ctx.drawImage(self.dom(), 0, 0);
		body.ctx.drawImage(self.dom(), 200, 0);
		body.ctx.drawImage(self.dom(), 400, 0);
		body.ctx.drawImage(self.dom(), 600, 0);
	};
	tree.addState("frame");
	tree.state["frame"].actioning(1);
	tree.state["frame"].action = function() {
		var self = this;
		var sprite = self.sprite;
		sprite.offsetLeft = sprite.offsetLeft - 40 / body.fps;
		sprite.offsetLeft = sprite.offsetLeft > -200 ? sprite.offsetLeft
				: sprite.offsetLeft + 200;
	};

	grass.dom(body.data["grass"]).x(0).y(0).width(body.data["grass"].width)
			.height(body.data["grass"].height);
	grass.offsetLeft = 0;
	grass.paint = function() {
		var self = this;
		self.translate(self.offsetLeft, 290);
		body.ctx.drawImage(self.dom(), 0, 0);
		body.ctx.drawImage(self.dom(), 500, 0);
	};
	grass.addState("frame");
	grass.state["frame"].actioning(1);
	grass.state["frame"].action = function() {
		var self = this;
		var sprite = self.sprite;
		sprite.offsetLeft = sprite.offsetLeft - 100 / body.fps;
		sprite.offsetLeft = sprite.offsetLeft > -500 ? sprite.offsetLeft
				: sprite.offsetLeft + 500;
	};

	S_grid.paint = function() {
		drawGrid(this, 20);
	};

	S_fps.width(0).height(0).x(0).y(0).fillStyle("#999");
	S_fps.paint = function() {
		body.fps = calculateFps();
		this.textAlign("left").textBaseline("top").fillText(
				"FPS:" + body.fps.toFixed());
	};
	

	
	S_sky
	
	S_sky.dom(body.data["sky"]).x(0).y(0).width(body.data["sky"].width).height(
			body.data["sky"].height);
	

*/	
	// 层添加精灵
	div.childClearDraw();
	//body.dom.addEventListener("click", mainDivClick, false);
	//body.dom.addEventListener("mousemove", mainDivMove, false);
	requestAnimationFrame(mainDivFrame);
}
function mainDivFrame() {
	var div = body.find("mainDiv");
	if (!body.paused) {
		div.update().childClearDraw();
		body.time++;
	}
	requestAnimationFrame(mainDivFrame);
}
function mainDivClick(event) {
	var you = body.find("you");
	var line = body.find("line");
	var ball = body.find("ball");
	ball.angle = line.angle;
	ball.velocity = line.velocity;
	ball.wind = line.wind;
	you.state["cast"].actioning(1);
}
function mainDivMove(event) {
	var line = body.find("line");
	var x = event.offsetX - line.baseX;
	var y = event.offsetY - line.baseY;
	var z = Math.sqrt(x * x + y * y);
	line.nz = z > 200 ? 200 : z;
	line.nx = line.nz * x / z;
	line.ny = line.nz * y / z;
}
