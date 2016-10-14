var body = new Body("demo");

body.dom.width = body.width = document.body.clientWidth;
body.dom.height = body.height = document.body.clientHeight;
var ctx = body.ctx;

dRect();
function dRect() {
	var div = body.addDiv([ "space" ]);

	var r1 = div.addSprite([ "r1" ]);
	var r2 = div.addSprite([ "r2" ]);

	r1.x = 10;
	r1.y = 10;
	r1.width = 100;
	r1.height = 100;
	r1.painter.paint = function(sprite) {
		ctx.save();
		ctx.fillStyle = "#ccc";
		ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
		ctx.restore();
	};
	r2.x = 120;
	r2.y = 120;
	r2.width = 100;
	r2.height = 100;
	r2.painter.paint = function(sprite) {
		ctx.save();
		ctx.fillStyle = "#333";
		ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
		ctx.restore();
	};

	for (var i = 0; i < 10; i++) {
		var jin = div.addSprite([ "r3_" + i ]);
		var randomSpace = Math.floor(Math.random() * 3);
		var randomImg = Math.floor(Math.random() * 3);
		var colorAry = [ "#ccc", "#000", "#eee" ];
		
		jin.x = 300 + 40 * randomSpace;
		jin.fillStyle = colorAry[randomImg];
		jin.y = 50 * i;
		jin.width = 10;
		jin.height = 10;

		jin.painter.paint = function(sprite) {
			ctx.save();
			ctx.fillStyle = sprite.fillStyle;
			ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
			ctx.restore();
		};
		jin.behaviors["actionDown"] = {};
		jin.behaviors["actionDown"].lastTime = 0;
		jin.behaviors["actionDown"].spaceTime = 1;
		jin.behaviors["actionDown"].execute = function(sprite) {
			var self = this;
			if (body.time - self.lastTime >= self.spaceTime) {
				sprite.y += 2;
				if (sprite.y > body.height) {
					var randomSpace = Math.floor(Math.random() * 3);
					var randomImg = Math.floor(Math.random() * 3);
					var colorAry = [ "#333", "#000", "#aaa" ]
					sprite.x = 300 + 40 * randomSpace;
					sprite.fillStyle = colorAry[randomImg];

					sprite.y = 0;
				}
				self.lastTime = body.time;
			}
		};
	}

	body.dom.addEventListener("touchstart", touchstart_r1, false);
	body.dom.addEventListener("touchstart", touchstart_r2, false);

	requestAnimationFrame(divPainter);
}

function divPainter() {
	var div = body.find("space");
	div.clearRect();
	drawGrid(body.dom, "rgba(0,0,0,.1)", 20);
	div.update();
	div.childDraw();
	requestAnimationFrame(divPainter);
}

function touchstart_r1(e) {
	var sprite = body.find("r1");
	var hit = isCollisionWithRegion(e.touches[0].clientX, e.touches[0].clientY,
			sprite.x, sprite.y, sprite.width, sprite.height);
	if (hit) {
		console.log(1);
		body.dom.removeEventListener("touchstart", touchstart_r1, false)
	}
}
function touchstart_r2(e) {
	var sprite = body.find("r2");
	var x1 = e.touches[0].clientX;
	var y1 = e.touches[0].clientY;
	var x2 = sprite.x;
	var y2 = sprite.y;
	var w2 = sprite.width;
	var h2 = sprite.height;
	var hit = isCollisionWithRegion(x1, y1, x2, y2, w2, h2);//
	if (hit) {// 判断鼠标点击区域
		console.log(2);
		sprite.mouseX = e.touches[0].clientX;
		sprite.mouseY = e.touches[0].clientY;
		sprite.oldX = sprite.x;
		sprite.oldY = sprite.y;
		body.dom.addEventListener("touchmove", touchmove_r2, false);
		body.dom.addEventListener("touchend", touchend_r2, false);
	}
}
function touchmove_r2(e) {
	var sprite = body.find("r2");
	sprite.x = sprite.oldX + (e.touches[0].clientX - sprite.mouseX);
	sprite.y = sprite.oldY + (e.touches[0].clientY - sprite.mouseY);
}
function touchend_r2(e) {
	var sprite1 = body.find("r1");
	var sprite2 = body.find("r2");
	var x1 = sprite1.x;
	var y1 = sprite1.y;
	var w1 = sprite1.width;
	var h1 = sprite1.height;
	var x2 = sprite2.x;
	var y2 = sprite2.y;
	var w2 = sprite2.width;
	var h2 = sprite2.height;
	var hit = isCollsionWithRect(x1, y1, w1, h1, x2, y2, w2, h2);
	if (hit) {
		console.log(222222);
	}
	body.dom.removeEventListener("touchmove", touchmove_r2, false);
	body.dom.addEventListener("touchend", touchend_r2, false);
}
