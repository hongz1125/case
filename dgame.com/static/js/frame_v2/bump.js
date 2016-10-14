/*
 * 图片预加载类
		imgLoad({
			imageAry:imageAry,
			callCenter:gameLoader,
			callReady:gameStar
		})
 * 
 * 
 * */
function imgLoad(json) {
	var len = json.imageAry.length;
	var newJson = {};
	var j = 0;
	for (var i = 0; i < len; i++) {
		var row = json.imageAry[i];
		var obj = newJson[row.id] = new Image();
		obj.src = row.src;
		obj.onload = function() {
			j++;
			if (json.callCenter) {
				json.callCenter(j, len);
			}
			if (j == len && json.callReady) {
				json.callReady(newJson);
			}
		}
	}
}

function pointToRect(x, y, x1, y1, x2, y2) {
	return (x1 < x && x < x2) && (y1 < y && y < y2);
}

function mouseToSprite(e, sprite) {
	var x = e.touches[0].clientX, y = e.touches[0].clientY, x1 = sprite.x, y1 = sprite.y, x2 = sprite.x
			+ sprite.width, y2 = sprite.y + sprite.height;
	return (x1 < x && x < x2) && (y1 < y && y < y2);
}
/*
 * 转二维数组
 */
function dyadicArray(w, h, row, col) {
	var i, j, cw = w / col, ch = h / row, r = [], c;
	for (i = 0; i < row; i++) {
		c = [];
		for (j = 0; j < col; j++) {
			c.push({
				x : cw * j,
				y : ch * i,
				width : w / col,
				height : h
			});
		}
		r.push(c);
	}
	return r;
};
/*
 * 计算帧率fps
 * 
 */
function countFps(newTime,oldTime) {
	var time = newTime - oldTime;
	var fps = parseInt(1000 / time);
	return fps;
}


/**
 * 绘制网格 drawGrid(dom,rgba(128,128,128,.1),10)
 */
function drawGrid(dom, color, step) {
	var ctx = dom.getContext("2d");
	var width = dom.width;
	var height = dom.height;
	var widthStep = width / step;
	var heightStep = height / step;
	ctx.beginPath();
	for (var i = 0; i < widthStep; i++) {
		ctx.moveTo(i * step + 0.5, +0.5);
		ctx.lineTo(i * step + 0.5, height);
	}
	for (var j = 0; j < heightStep; j++) {
		ctx.moveTo(0, j * step + 0.5);
		ctx.lineTo(width + 0.5, j * step + 0.5);
	}
	ctx.strokeStyle = color;
	ctx.stroke();
}
/**
 * 获取可视高度 获取可视宽度 getSize(w,h)
 * 
 * @param w
 *            设计稿 宽
 * @param h
 *            设计稿 高
 * @param way
 *            适配方式 "rate","width" //按比率居 按宽度适配 按高度适配
 *  @param align
 *            适配方式 "center","bottom","top" //按比率居 按宽度适配 按高度适配
 * 
 */
function getSize(desigeWidth, desigeHeight,drawWidth,drawHeight) {
	//该方法适配按比率游戏
	console.log()
	var browserWidth = document.documentElement.clientWidth ;
	var browserHeight = document.documentElement.clientHeight;
	var phyWidth;
	var phyHeight;
	
	var devicePixelRatio = window.devicePixelRatio || 1;
	var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio
			|| ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio
			|| ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	
	var rateRatio = devicePixelRatio / backingStorePixelRatio;//比率 像素比
	phyWidth=browserWidth*rateRatio;
	phyHeight=browserHeight*rateRatio;

	
	var rateW = browserWidth/drawWidth;
	var rateH = browserHeight/drawHeight;
	
	var rateDW = drawWidth*rateW;
	var rateDH = drawHeight*rateH;
	

	return {
		"rateRatio" : rateRatio,// 比率 像素
		"rateDW":rateDW,// 比率 设计换算到展示
		"rateDH":rateDH, //比率 设计换算到展示
		"rateW" : rateW,// 比率 宽
		"rateH" : rateH,// 比率 高

		"desigeWidth" : desigeWidth,// 设计稿宽度
		"desigeHeight" : desigeHeight,// 设计稿高度
		
		"drawWidth" : drawWidth,// 绘制 宽度
		"drawHeight" : drawHeight,// 绘制 高度
		
		"browserWidth" : browserWidth,// 设备 宽度
		"browserHeight" : browserHeight,// 设备 高度
		
		"phyWidth" : phyWidth,// 物理宽度
		"phyHeight" : phyHeight// 物理高度
	};
}

/**
 * 碰撞部分
 */
/**
 * 坐标碰撞 isCollisionWithRegion(x1,y1,x2,y2,w2,h2)
 * 
 * @param x1
 *            鼠标X坐标
 * @param y1
 *            鼠标Y坐标
 * @param x2
 *            矩形X坐标
 * @param y2
 *            矩形Y坐标
 * @param w1
 *            矩形宽度
 * @param h1
 *            矩形高度
 */
function isCollisionWithRegion(x1, y1, x2, y2, w2, h2) {
	if (x1 < x2) {
		return false;
	} else if (x1 > x2 + w2) {
		return false;
	} else if (y1 < y2) {
		return false;
	} else if (y1 > y2 + h2) {
		return false;
	}
	return true;
}
/**
 * 矩形碰撞 isCollsionWithRect(x1, y1, w1, h1, x2, y2, w2, h2)
 * 
 * @param x1
 *            第一个矩形的X 坐标
 * @param y1
 *            第一个矩形的Y 坐标
 * @param w1
 *            第一个矩形的宽
 * @param h1
 *            第一个矩形的高
 * @param x2
 *            第二个矩形的X 坐标
 * @param y2
 *            第二个矩形的Y 坐标
 * @param w2
 *            第二个矩形的宽
 * @param h2
 *            第二个矩形的高
 * @return
 */
function isCollsionWithRect(x1, y1, w1, h1, x2, y2, w2, h2) {
	// 当矩形1 位于矩形2 的左侧
	if (x1 >= x2 && x1 >= x2 + w2) {
		return false;
		// 当矩形1 位于矩形2 的右侧
	} else if (x1 <= x2 && x1 + w1 <= x2) {
		return false;
		// 当矩形1 位于矩形2 的上方
	} else if (y1 >= y2 && y1 >= y2 + h2) {
		return false;
		// 当矩形1 位于矩形2 的下方
	} else if (y1 <= y2 && y1 + h1 <= y2) {
		return false;
	}
	// 所有不会发生碰撞都不满足时，肯定就是碰撞了
	return true;
}

/**
 * 圆形碰撞 isCollisionWithCircle(x1, y1, r1, x2, y2, r2)
 * 
 * @param x1
 *            圆形1 的圆心X 坐标
 * @param y1
 *            圆形2 的圆心X 坐标
 * @param x2
 *            圆形1 的圆心Y 坐标
 * @param y2
 *            圆形2 的圆心Y 坐标
 * @param r1
 *            圆形1 的半径
 * @param r2
 *            圆形2 的半径
 * @return
 */
function isCollisionWithCircle(x1, y1, r1, x2, y2, r2) {
	// Math.sqrt:开平方
	// Math.pow(double x, double y): X 的Y 次方
	if (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) <= r1 + r2) {
		// 如果两圆的圆心距小于或等于两圆半径则认为发生碰撞
		return true;
	}
	return false;
}
