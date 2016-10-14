var imageAry = [ {
	id : "boon",
	src : "static/images/j_boon.png"
}, {
	id : "cloud",
	src : "static/images/j_cloud.png"
}, {
	id : "hill",
	src : "static/images/j_hill.png"
}, {
	id : "jin",
	src : "static/images/j_jin.png"
}, {
	id : "pig",
	src : "static/images/j_pig.png"
}, {
	id : "sky",
	src : "static/images/j_sky.png"
}, {
	id : "tree",
	src : "static/images/j_tree.png"
}, {
	id : "space",
	src : "static/images/j_space.png"
}, {
	id : "btn",
	src : "static/images/j_btn.png"
} ];//创建图像数组

// 初始化游戏
var body = new Body("demo"), ctx = body.ctx;
var SIZE = getAllSize(720, 1134);

body.width = body.dom.width = SIZE.phyWidth;//写入物理像素
body.height = body.dom.height = SIZE.phyHeight;

body.marginX = (SIZE.deviceWidth - SIZE.aloneWidth) / 2;
body.marginY = (SIZE.deviceHeight - SIZE.aloneHeight) / 2;

body.dom.style.width = SIZE.aloneWidth + "px";//写入独立像素
body.dom.style.height = SIZE.aloneHeight + "px";
body.dom.style.marginLeft = body.marginX + "px";
body.dom.style.marginTop = body.marginY + "px";

document.body.addEventListener('touchmove', function(event) {
	event.preventDefault();
}, false);// 禁用页面滚动条

/*音乐部分
var audioBg = document.createElement("audio");
audioBg.src = "static/audio/1.mp3";
audioBg.loop = 1;
audioBg.volume = .3;
var audioJin = document.createElement("audio");
audioJin.src = "static/audio/2.wav";
audioJin.volume = .3;
var audioBoon = document.createElement("audio");
audioBoon.src = "static/audio/3.wav";
audioBoon.volume = .2;
*/
imgLoad({
	imageAry : imageAry,
	callCenter : gameLoader,
	callReady : gameReady
});

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
		sprite.fillStyle("#80d7ff").fillRect();
	};

	S_text.left = 0;
	S_text.top = 0;
	S_text.width = body.width;
	S_text.height = body.height;
	var font = "bold " + SIZE.rateSize * 40 + "px/" + SIZE.rateSize * 100
			+ "px Georgia";
	S_text.painter.paint = function(sprite) {
		ctx.save();
		sprite.fillStyle("white").textAlign("center").textBaseline("middle")
				.font(font).fillText(i + "/" + j);
		ctx.restore();
	};

	// 主层绘制
	div.childClearDraw();
}

function gameReady(data) {
	console.log(body);
	console.log(SIZE);
	body.data = data;

	// 注册层,精灵
	var div = body.addDiv("readyDiv");
	var S_background = div.addSprite("background");
	var S_start = div.addSprite("start");

	S_background.x = 0;
	S_background.y = 0;
	S_background.width = body.width;
	S_background.height = body.height;
	S_background.painter.paint = function(sprite) {
		sprite.fillStyle("#80d7ff").fillRect();
	};

	S_start.width = SIZE.rateSize * 200;
	S_start.height = SIZE.rateSize * 100;
	S_start.x = body.width / 2 - S_start.width / 2;
	S_start.y = body.height / 2 - S_start.height / 2;
	var font = "bold " + SIZE.rateSize * 40 + "px/" + SIZE.rateSize * 100
			+ "px Georgia";
	S_start.painter.paint = function(sprite) {
		sprite.fillStyle("#aaa").fillRect().fillStyle("#fff").textAlign(
				"center").textBaseline("middle").font(font).fillText("开始");
	};
	S_start.on("touchstart", startTouchStart);
	// 绘制层
	div.childClearDraw();
}

// 开始画面事件
function startTouchStart(e) {
	var sprite = body.find("start");
	var x1 = e.touches[0].clientX - body.marginX;
	var y1 = e.touches[0].clientY - body.marginY;
	var x2 = sprite.x / SIZE.rateRatio;
	var y2 = sprite.y / SIZE.rateRatio;
	var w2 = sprite.width / SIZE.rateRatio;
	var h2 = sprite.height / SIZE.rateRatio;
	var hit = isCollisionWithRegion(x1, y1, x2, y2, w2, h2);
	if (hit) {
		sprite.off("touchstart", startTouchStart);// 取消事件
		gameStar();// 运行游戏开始
	}
}

function gameStar() {
	//audioBg.play();
	// 注册层,精灵
	var div = body.addDiv("mainDiv");
	body.time = 0;

	var S_background = div.addSprite("background");
	var S_hill = div.addSprite("hill");
	var S_tree = div.addSprite("tree");
	var S_cloud = div.addSprite("cloud");
	var S_pig = div.addSprite("pig");

	// ---------------------------------------
	var jinBgAry = [ {
		"x" : 0,
		"y" : 0,
		"width" : 240,
		"height" : 275
	}, {
		"x" : 240,
		"y" : 0,
		"width" : 240,
		"height" : 275
	}, {
		"x" : 480,
		"y" : 0,
		"width" : 240,
		"height" : 275
	} ];
	var boonBgAry = [ {
		"x" : 0,
		"y" : 0,
		"width" : 240,
		"height" : 250
	}, {
		"x" : 240,
		"y" : 0,
		"width" : 240,
		"height" : 250
	}, {
		"x" : 480,
		"y" : 0,
		"width" : 240,
		"height" : 250
	}, {
		"x" : 0,
		"y" : 0,
		"width" : 0,
		"height" : 0
	} ];// 最后一个是空的图片
	var jinAry = [];
	for (var i = 0; i < 8; i++) {
		var randomImg = Math.floor(Math.random() * 3);
		var randomSpace = Math.floor(Math.random() * 3);
		jinAry[i] = {
			"x" : SIZE.rateSize * 240 * randomSpace,
			"y" : body.height * i / 4 - body.height * 2,
			"cellIndex" : randomImg
		};
	}

	var S_jin = div.addSprite("r3");
	S_jin.gx = SIZE.rateSize * 122;
	S_jin.gy = SIZE.rateSize * 207;
	S_jin.gr = SIZE.rateSize * 60;
	S_jin.child = jinAry;// 子精灵数组
	S_jin.jinBgAry = jinBgAry;// 子图片数组
	S_jin.boonBgAry = boonBgAry;// 爆炸背景
	S_jin.painter = new SpriteSheetPainter(body.data["jin"], jinBgAry);
	S_jin.painter.paint = function(sprite) {
		var self = this;
		for ( var i in sprite.child) {
			var _s = sprite.child[i];
			var cell = sprite.jinBgAry[_s.cellIndex];
			ctx.save();
			ctx.beginPath();
			ctx.translate(_s.x, _s.y);
			if (_s.boon) {
				var boonImg = sprite.boonBgAry[_s.boonImg];
				ctx.drawImage(body.data["boon"], boonImg.x, boonImg.y,
						boonImg.width, boonImg.height, 0, SIZE.rateSize * 20,
						SIZE.rateSize * boonImg.width, SIZE.rateSize
								* boonImg.height);
			} else {
				ctx.drawImage(self.image, cell.x, cell.y, cell.width,
						cell.height, 0, 0, SIZE.rateSize * cell.width,
						SIZE.rateSize * cell.height);
			}
			ctx.restore();
		}
	};

	S_jin.behaviors["action1"] = {};
	S_jin.behaviors["action1"].actioning = 1;
	S_jin.behaviors["action1"].lastTime = 0;
	S_jin.behaviors["action1"].spaceTime = 1;
	S_jin.behaviors["action1"].speed = 4;
	S_jin.behaviors["action1"].execute = function(sprite) {
		var self = this;
		var pig = body.childDiv.mainDiv.childSprite.pig;
		var txt = body.childDiv.mainDiv.childSprite.txt;
		if (body.time - self.lastTime > self.spaceTime) {// 判断 是否需要变换
			for ( var i in sprite.child) {
				var _s = sprite.child[i];
				self.speed += .002;
				_s.y += self.speed;
				var x1 = pig.gx + pig.x;
				var y1 = pig.gy + pig.y;
				var r1 = pig.gr;
				var x2 = sprite.gx + _s.x;
				var y2 = sprite.gy + _s.y;
				var r2 = sprite.gr;
				var hit = isCollisionWithCircle(x1, y1, r1, x2, y2, r2);

				var randomImg = Math.floor(Math.random() * 3);
				var randomSpace = Math.floor(Math.random() * 3);

				if (hit) {
					if (_s.cellIndex == 0) {
						//audioJin.currentTime = 0;
						//audioJin.play();
						S_pig.painter.cellIndex = 1;
						txt.money += 100;
						_s.y = _s.y - body.height * 2;
						_s.x = SIZE.rateSize * 240 * randomSpace;
						_s.cellIndex = randomImg;
						return false;
					}
					if (_s.cellIndex == 1) {
						//audioJin.currentTime = 0;
						//audioJin.play();
						S_pig.painter.cellIndex = 1;// 小猪高兴状态
						txt.money += 50;
						_s.y = _s.y - body.height * 2;
						_s.x = SIZE.rateSize * 240 * randomSpace;
						_s.cellIndex = randomImg;
						return false;
					}
					if (_s.cellIndex == 2) {
						//audioBoon.play();
						gameOver(_s, sprite);
					}
				}
				if (_s.y >= body.height) {
					_s.x = SIZE.rateSize * 240 * randomSpace;
					_s.cellIndex = randomImg;
					_s.y = _s.y - body.height * 2;
				}
			}
		}
	};
	S_jin.behaviors["action2"] = {};
	S_jin.behaviors["action2"].actioning = 0;
	S_jin.behaviors["action2"].lastTime = 0;
	S_jin.behaviors["action2"].spaceTime = 2;
	S_jin.behaviors["action2"].execute = function(sprite) {
		var self = this;
		if (body.time - self.lastTime > self.spaceTime) {
			sprite.boonDom.boonImg++;
			if (sprite.boonDom.boonImg > 2) {
				sprite.behaviors["action2"].actioning = 0;
				div.showOver = 1;
			}
			self.lastTime = body.time;
		}
	};

	var S_sky = div.addSprite("sky");

	var S_txt = div.addSprite("txt");

	S_sky.painter = new ImagePainter(body.data["sky"]);
	S_sky.x = 0;
	S_sky.y = 0;
	S_sky.width = SIZE.rateSize * S_sky.painter.image.width;
	S_sky.height = SIZE.rateSize * S_sky.painter.image.height;
	S_sky.painter.offsetLeft = 0;
	S_sky.painter.paint = function(sprite) {
		var self = this;
		ctx.save();
		ctx.translate(self.offsetLeft, 0);
		ctx.drawImage(self.image, 0, 0, sprite.width, sprite.height);
		ctx.drawImage(self.image, sprite.width, 0, sprite.width, sprite.height);
		ctx.restore();
	};
	S_sky.behaviors["action1"] = {};
	S_sky.behaviors["action1"].lastTime = 0;
	S_sky.behaviors["action1"].spaceTime = 1;
	S_sky.behaviors["action1"].actioning = 1;
	S_sky.behaviors["action1"].execute = function(sprite) {
		var self = this;
		if (sprite.body.time - self.lastTime >= self.spaceTime) {
			sprite.painter.offsetLeft -= SIZE.rateSize * .5;
			if (-sprite.painter.offsetLeft >= body.width) {
				sprite.painter.offsetLeft = 0;
			}
			self.lastTime = sprite.body.time;
		}
	};

	S_hill.painter = new ImagePainter(body.data["hill"]);
	S_hill.x = SIZE.rateSize * 600;
	S_hill.y = SIZE.rateSize * 1012;
	S_hill.width = SIZE.rateSize * S_hill.painter.image.width;
	S_hill.height = SIZE.rateSize * S_hill.painter.image.height;
	S_hill.painter.offsetLeft = 0;
	S_hill.painter.repeatWidth = S_hill.x + S_hill.width;
	S_hill.painter.paint = function(sprite) {
		var self = this;
		ctx.save();
		ctx.translate(self.offsetLeft, 0);
		ctx.drawImage(self.image, sprite.x, sprite.y, sprite.width,
				sprite.height);
		ctx.drawImage(self.image, sprite.x * 2 + sprite.width * 2, sprite.y,
				sprite.width, sprite.height);
		ctx.restore();
	};
	S_hill.behaviors["action1"] = {};
	S_hill.behaviors["action1"].lastTime = 0;
	S_hill.behaviors["action1"].actioning = 1;
	S_hill.behaviors["action1"].spaceTime = 1;
	S_hill.behaviors["action1"].execute = function(sprite) {
		var self = this;
		if (body.time - self.lastTime >= self.spaceTime) {
			sprite.painter.offsetLeft -= SIZE.rateSize * 1.5;
			if (-sprite.painter.offsetLeft >= sprite.repeatWidth) {
				sprite.painter.offsetLeft = 0;
			}
			self.lastTime = body.time;
		}
	};

	S_tree.painter = new ImagePainter(body.data["tree"]);
	S_tree.width = SIZE.rateSize * S_tree.painter.image.width;
	S_tree.height = SIZE.rateSize * S_tree.painter.image.height;
	S_tree.painter.offsetLeft = 0;
	S_tree.painter.paint = function(sprite) {
		var self = this;
		ctx.save();
		ctx.translate(self.offsetLeft + SIZE.rateSize * 20,
				SIZE.rateSize * 1035);
		ctx.drawImage(self.image, 0, 0, sprite.width, sprite.height);
		ctx.drawImage(self.image, SIZE.rateSize * 400, 0, sprite.width,
				sprite.height);
		ctx.drawImage(self.image, SIZE.rateSize * 800, 0, sprite.width,
				sprite.height);
		ctx.drawImage(self.image, SIZE.rateSize * 1200, 0, sprite.width,
				sprite.height);
		ctx.restore();
	};
	S_tree.behaviors["action1"] = {};
	S_tree.behaviors["action1"].lastTime = 0;
	S_tree.behaviors["action1"].spaceTime = 1;
	S_tree.behaviors["action1"].actioning = 1;
	S_tree.behaviors["action1"].execute = function(sprite) {
		var self = this;
		if (body.time - self.lastTime >= self.spaceTime) {
			sprite.painter.offsetLeft -= SIZE.rateSize * 2;
			if (-sprite.painter.offsetLeft >= SIZE.rateSize * 400) {
				sprite.painter.offsetLeft = 0;
			}
			self.lastTime = body.time;
		}
	};

	S_cloud.painter = new ImagePainter(body.data["cloud"]);
	S_cloud.width = SIZE.rateSize * S_cloud.painter.image.width;
	S_cloud.height = SIZE.rateSize * S_cloud.painter.image.height;
	S_cloud.painter.offsetLeft = 0;
	S_cloud.painter.paint = function(sprite) {
		var self = this;
		ctx.save();
		ctx.translate(self.offsetLeft + SIZE.rateSize * 653,
				SIZE.rateSize * 207);
		ctx.drawImage(self.image, 0, 0, sprite.width, sprite.height);
		ctx.drawImage(self.image, body.width, 0, sprite.width, sprite.height);
		ctx.restore();

		ctx.save();
		ctx.translate(self.offsetLeft + SIZE.rateSize * 255,
				SIZE.rateSize * 630);
		ctx.drawImage(self.image, 0, 0, sprite.width, sprite.height);
		ctx.drawImage(self.image, body.width, 0, sprite.width, sprite.height);
		ctx.restore();

		ctx.save();
		ctx.translate(self.offsetLeft + SIZE.rateSize * 5, SIZE.rateSize * 450);
		ctx.drawImage(self.image, 0, 0, sprite.width, sprite.height);
		ctx.drawImage(self.image, body.width, 0, sprite.width, sprite.height);
		ctx.restore();

	};
	S_cloud.behaviors["action1"] = {};
	S_cloud.behaviors["action1"].lastTime = 0;
	S_cloud.behaviors["action1"].actioning = 1;
	S_cloud.behaviors["action1"].spaceTime = 1;
	S_cloud.behaviors["action1"].execute = function(sprite) {
		var self = this;
		if (body.time - self.lastTime >= self.spaceTime) {
			sprite.painter.offsetLeft -= SIZE.rateSize * 3;
			if (-sprite.painter.offsetLeft > body.width) {
				sprite.painter.offsetLeft = 0;
			}
			self.lastTime = body.time;
		}
	};

	S_background.x = 0;
	S_background.y = 0;
	S_background.width = body.width;
	S_background.height = body.height;
	S_background.painter.paint = function(sprite) {
		ctx.fillStyle = "#80d7ff";
		ctx.fillRect(0, 0, sprite.width, sprite.height);
		ctx.fillStyle = "#89c533";
		ctx.fillRect(0, SIZE.rateSize * 1085, sprite.width, SIZE.rateSize * 16);
		ctx.fillStyle = "#836136";
		ctx.fillRect(0, SIZE.rateSize * 1101, sprite.width, SIZE.rateSize * 33);
		var space = body.data["space"];
		ctx.drawImage(space, SIZE.rateSize * 239, 0, SIZE.rateSize
				* space.width, SIZE.rateSize * space.height);
		ctx.drawImage(space, SIZE.rateSize * 476, 0, SIZE.rateSize
				* space.width, SIZE.rateSize * space.height);
	};

	S_pig.repeatSprite = [ {
		"x" : 0,
		"y" : 0,
		"width" : 240,
		"height" : 204
	}, {
		"x" : 240,
		"y" : 0,
		"width" : 240,
		"height" : 204
	}, {
		"x" : 480,
		"y" : 0,
		"width" : 240,
		"height" : 204
	} ];
	S_pig.x = 0;
	S_pig.y = SIZE.rateSize * 894;
	S_pig.gx = SIZE.rateSize * 125;
	S_pig.gy = SIZE.rateSize * 102;
	S_pig.gr = SIZE.rateSize * 80;
	S_pig.painter = new SpriteSheetPainter(body.data["pig"], S_pig.repeatSprite);
	S_pig.behaviors["action1"] = {};
	S_pig.behaviors["action1"].actioning = 1;
	S_pig.behaviors["action1"].lastTime = 0;
	S_pig.behaviors["action1"].spaceTime = 5;
	S_pig.behaviors["action1"].execute = function(sprite) {
		var self = this;
		if (sprite.painter.cellIndex == 1) {
			if (body.time - self.lastTime >= self.spaceTime) {
				sprite.painter.cellIndex = 0;
			}
			return false;
		}
		self.lastTime = body.time;

	};
	S_pig.painter.paint = function(sprite) {
		var self = this;
		var cell = self.cells[self.cellIndex];
		ctx.save();
		ctx.beginPath();
		ctx.translate(sprite.x, sprite.y);
		ctx.drawImage(self.image, cell.x, cell.y, cell.width, cell.height, 0,
				0, SIZE.rateSize * cell.width, SIZE.rateSize * cell.height);
		ctx.restore();
	};

	S_txt.money = 0;
	S_txt.painter.paint = function(sprite) {
		ctx.save();
		ctx.font = SIZE.rateSize * 60 + "px Microsoft Yahei";
		ctx.fillStyle = "#ff703a";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(sprite.money, body.width / 2, SIZE.rateSize * 80 / 2);
		ctx.font = SIZE.rateSize * 30 + "px Microsoft Yahei";
		ctx.fillText("RMB", body.width / 2, SIZE.rateSize * 30 / 2
				+ SIZE.rateSize * 80);
		ctx.restore();
	}

	// 层添加精灵
	S_pig.on("touchstart", touchStart_pig);// 小猪添加事件

	mainDivFrame();
}

function touchStart_pig(e) {
	var S_pig = body.find("pig");
	S_pig.painter.baseClient = e.touches[0].clientX - body.marginX;
	S_pig.painter.baseLeft = S_pig.x;
	S_pig.on("touchmove", touchMove_pig);
	S_pig.on("touchend", touchEnd_pig);
}
function touchMove_pig(e) {
	var S_pig = body.find("pig");
	var changeLeft = e.touches[0].clientX - S_pig.painter.baseClient;
	S_pig.x = S_pig.painter.baseLeft + changeLeft * SIZE.rateRatio;
	S_pig.x = S_pig.x < 0 ? 0 : S_pig.x;
	S_pig.x = S_pig.x > SIZE.rateSize * 480 ? SIZE.rateSize * 480 : S_pig.x;
	return false;
}
function touchEnd_pig(e) {
	var S_pig = body.find("pig");
	S_pig.off("touchmove", touchMove_pig);
	S_pig.off("touchend", touchEnd_pig);
}

function mainDivFrame() {
	if (!body.paused) {
		var div = body.find("mainDiv");
		div.update();
		div.childClearDraw();
		if (div.showOver) {
			showResult();
			return false;
		}
	}
	requestAnimationFrame(mainDivFrame);
}

function gameOver(_s, sprite) {
	var S_pig = body.find("pig");
	_s.boon = 1;// 设置爆炸
	_s.boonImg = 0;
	sprite.behaviors["action1"].actioning = 0;
	sprite.behaviors["action2"].actioning = 1;

	S_pig.painter.cellIndex = 2;// 小猪变黑状态
	S_pig.off("touchstart", touchStart_pig);
	S_pig.off("touchMove", touchMove_pig);

	sprite.boonDom = _s;
}

// 结果展示
function showResult() {
	var div = body.addDiv("resultDiv");
	var S_sky = div.addSprite("sky");
	S_sky.painter = new ImagePainter(body.data["sky"]);
	S_sky.x = 0;
	S_sky.y = 0;
	S_sky.width = SIZE.rateSize * S_sky.painter.image.width;
	S_sky.height = SIZE.rateSize * S_sky.painter.image.height;
	S_sky.painter.offsetTop = 0;
	S_sky.painter.paint = function(sprite) {
		var self = this;
		ctx.save();
		ctx.translate(0, self.offsetTop);
		ctx.drawImage(self.image, 0, 0, sprite.width, sprite.height);
		ctx.fillStyle = "#f2fbff";
		ctx.fillRect(0, -600 * SIZE.rateSize, body.width, 600 * SIZE.rateSize);

		ctx.font = SIZE.rateSize * 60 + "px Microsoft Yahei";
		ctx.fillStyle = "#ff703a";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		var money = body.find("txt").money
		ctx.fillText(money, body.width / 2, SIZE.rateSize * 80 / 2);
		ctx.font = SIZE.rateSize * 30 + "px Microsoft Yahei";
		ctx.fillText("RMB", body.width / 2, SIZE.rateSize * 30 / 2
				+ SIZE.rateSize * 80);
		ctx.fillStyle = "#666";
		ctx.fillText("哎呦，您捡了" + money + "元，弱爆了！", body.width / 2, -120
				* SIZE.rateSize);
		ctx.fillText("想捡更多钱就滑起来", body.width / 2, -70 * SIZE.rateSize);
		ctx.drawImage(body.data["btn"], 0, -400 * SIZE.rateSize,
				720 * SIZE.rateSize, 156 * SIZE.rateSize);
		ctx.restore();
	};
	S_sky.behaviors["action1"] = {};
	S_sky.behaviors["action1"].actioning = 1;
	S_sky.behaviors["action1"].lastTime = 0;
	S_sky.behaviors["action1"].spaceTime = 1;
	S_sky.behaviors["action1"].execute = function(sprite) {
		var self = this;
		if (body.time - self.lastTime >= self.spaceTime) {
			sprite.painter.offsetTop += 20;
			if (sprite.painter.offsetTop >= 500 * SIZE.rateSize) {
				div.showOver = 1;
			}
		}
		return false;
		self.lastTime = body.time;
	};
	resultDivFrame();
}
function resultDivFrame() {
	if (!body.paused) {
		var div = body.find("resultDiv");
		div.update();
		div.childDraw();
		if (div.showOver) {
			div.find("sky").on("touchstart", reStart);
			return false;
		}
	}
	requestAnimationFrame(resultDivFrame);
}
function reStart(e) {
	var x1 = e.touches[0].clientX - body.marginX;
	var y1 = e.touches[0].clientY - body.marginY;
	var x2 = 270 * SIZE.rateSize / SIZE.rateRatio;
	var y2 = 100 * SIZE.rateSize / SIZE.rateRatio;
	var w2 = 200 * SIZE.rateSize / SIZE.rateRatio;
	var h2 = 156 * SIZE.rateSize / SIZE.rateRatio;
	var hit = isCollisionWithRegion(x1, y1, x2, y2, w2, h2);
	if (hit) {
		body.find("resultDiv").find("sky").off("touchstart", reStart);
		gameStar();
		return false;
	}
}
