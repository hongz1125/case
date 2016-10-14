jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });

var Mzqb = Mzqb || {};

//正则验证
Mzqb.regRule = {
	loginName:{
		reg:/^\d{11}$/,
		msg:"请输入正确的手机号"	
	},
    loginPassword:{
        reg:/^\w{6,16}$/,
        msg:"请输入6-16位密码"
    },
    validCode:{
        reg:/^\w{4}$/,
        msg:"请输入4位验证码"
    },
    nickName:{
        reg:/^[^\s]{2,20}$/,
        msg:"请输入2-20位昵称"
    },
	planMoney:{	
		reg:/^\d{1,3}00$/,
		msg:"金额范围 500、600、700—10000"	
	},
	planTime:{
		reg:/^\d{1,2}$/,
		msg:"期数范围 2 — 24 "
	}
};
Mzqb.defauleData = {
	planTag:[
		{name:"关爱父母1"},
		{name:"关爱父母2"},
        {name:"关爱父母3"},
        {name:"关爱父母4"},
        {name:"关爱父母5"},
        {name:"关爱父母6"},
        {name:"关爱父母7"},
        {name:"关爱父母8"},
        {name:"关爱父母9"},
		{name:"关爱父母10"}
	],
	planTagDef:"关爱父母1",
	planRate:[
		{time:2 ,rate:0.0700},
		{time:3 ,rate:0.0730},
		{time:4 ,rate:0.0760},
		{time:5 ,rate:0.0790},
		{time:6 ,rate:0.0820},
		{time:7 ,rate:0.0850},
		{time:8 ,rate:0.0880},
		{time:9 ,rate:0.0910},
		{time:10,rate:0.0940},
		{time:11,rate:0.0970},
		{time:12,rate:0.1000},
		{time:13,rate:0.1000},
		{time:14,rate:0.1000},
		{time:15,rate:0.1000},
		{time:16,rate:0.1000},
		{time:17,rate:0.1000},
		{time:18,rate:0.1000},
		{time:19,rate:0.1000},
		{time:20,rate:0.1000},
		{time:21,rate:0.1000},
		{time:22,rate:0.1000},
		{time:23,rate:0.1000},
		{time:24,rate:0.1000}
	]
}
/*数据初始化*/
localStorage.money = localStorage.money || 2000;
localStorage.time = localStorage.time || 6;
localStorage.rate = localStorage.rate || 0.0820;
localStorage.planName = localStorage.planName || "";

Mzqb.htmlPart = {
    "ajaxfail":"请求数据失败！",//全站ajax请求失败提示
    "waitPay":"请使用电脑登录<br />zqb.creditease.cn进行支付",//待支付时进行支付提示
    "accoutnIndexWelcome":"欢迎回来,",
    "loginCode":"正在接收验证码,请等待...",
    "planIndexLoginMsg":'已有帐号,直接 <a href="#loginIndex" class="zz_btn_3">登录</a> 或 <a href="#loginRegister" class="zz_btn_2">注册</a>',
    "codeCantGet":'\
    	<div id="codeCant" class="zz_bg_1">\
            <div class="zz_list_15">\
                <p class="zz_txt_3">获取验证码方式</p>\
                <p class="zz_btn_1"><a href="javascript:;" id="loginCodeAgain">重新获取验证码</a></p>\
                <p class="zz_btn_1"><a href="javascript:;" id="loginCodeVoice">接听语音验证码</a></p>\
                <p class="zz_btn_0"><a href="javascript:;" id="loginCodeBtn">取消</a></p>\
            </div>\
            <i id="loginCodeClose" class="icon-zz-10"></i>\
        </div>'
}

jQuery.fn.extend({
    /*
    * title 顶部弹出错误信息
    * param msg 错误信息
    * */
	messageTopTip:function(msg){
		var pageObj = this;
		var msg = msg;
		var msgObj = $('<div class="zz_tip_1"></div>').html("<span>"+msg+"</span>");
		pageObj.append(msgObj);
		msgObj.animate({
			top:0
		},300,'swing')
		.delay(2000)
		.animate({
			top:-50
		},250,'swing',function(){
               $(this).remove();
            });
	},
    /*
    * title 应用模板方法
    * param data json // 插入输入可以为空
    * */
	getTmpl:function(data){
		var pageObj = this;
        var data = data || {};
		var tmpl = $("script[data-tmpl='" + pageObj.attr("id") + "']:first").html();
        var tmpl = $.tmpl(tmpl,data);
        return tmpl;
	},
    /*
    * title 左右滑动
    * total number //需要运动的数量
    * numSel number //默认选中第几个 从零开始
    * width number //单个元素宽度
    * */
    touchSwipe:function(total,numSel,width){
        var touchObj = this;//触摸对象
        var pageObj = $("#planIndex");//页面对象
        var moveObj = touchObj.find("ul:first");//移动对象
        touchObj.tWidth = touchObj.width();
        moveObj.newLeft = moveObj.Left = -numSel*width;
        moveObj.css("left",moveObj.Left);

        pageObj.on("touchstart",touchObj.selector,function(event){
            moveObj.stop();
            touchObj.startX = touchObj.moveX = event.originalEvent.changedTouches[0].clientX;
            var ary = [];
            touchObj.bind("touchmove",function(event){
                touchObj.moveX = event.originalEvent.changedTouches[0].clientX;
                moveObj.newLeft = moveObj.Left + (touchObj.moveX - touchObj.startX);
                moveObj.css("left",moveObj.newLeft);
                ary.splice(0,0,{
                    "timeStamp":event.originalEvent.timeStamp,
                    "clientX":touchObj.moveX
                });
                ary.length = ary.length > 4 ? 4 : ary.length;
                return false;
            }) .bind("touchend",function(event){
                touchObj.endX = event.originalEvent.changedTouches[0].clientX;
                moveObj.easing = "easeOutQuart";
                if(!ary.length){
                    touchObj.endX += touchObj.tWidth/2 - touchObj.endX;
                    moveObj.newLeft = moveObj.Left;
                }else if(ary.length>3){
                    var time = ary[0].timeStamp - ary[3].timeStamp;
                    var space = ary[0].clientX - ary[3].clientX;
                    if(time < 100 && Math.abs(space)>10){
                        touchObj.endX += (space/time)*200;
                        touchObj.showTime = 250 || 250 + Math.abs(space/time*20);
                    }
                }
                touchObj.way = touchObj.endX - touchObj.moveX;
                moveObj.newLeft = touchObj.way+moveObj.newLeft;

                moveObj.goNum = -Math.round(moveObj.newLeft/width);
               // console.log(moveObj.goNum,touchObj.way)
                if(1 > moveObj.goNum){
                    touchObj.easing = "easeOutBack";
                    moveObj.goNum = 1;
                }
                if(total < moveObj.goNum){
                    moveObj.easing = "easeOutBack";
                    moveObj.goNum = total;
                }
                moveObj.Left = -moveObj.goNum*width;
                moveObj.animate({left:moveObj.Left},moveObj.showTime,moveObj.easing);
                localStorage.time = moveObj.goNum+1;
                localStorage.rate = Mzqb.defauleData.planRate[moveObj.goNum-1].rate;

                var textRate = (localStorage.rate*100).toFixed(1) + " %";
                $('#rate').text(textRate);
                touchObj.unbind("touchmove touchend");
            })
        })
    }
});
/*
* title 数字转2位dom
* param num 数字
* callback string// 11.11 to <i>11</i><i>.11</i>
* */
function numToDom(num){
	var str = num.toFixed(2);
	str = str.replace(/^(\d*)\.(\d*)$/,function(str,$1,$2){
		return "<i>"+$1+"</i><i>." +$2+"</i>";
	})
	return str;
}
/*
* title 给数字 算第几个
* param number //现在在第几个
* param ary
* */
function sizeToSize(num,$ary){
    $ary.each(function(i){
        var self = $(this);
        var per = Math.round((1-(Math.abs(num-i))*0.2)*100)/100
        self.css({
            "font-size":per + "em",
            "opacity":per
        })
    });
}
 /*
 title 给月份算利率
 param time //number
 param rateAry //array
 callback number //例如0.007
 */
function timeOutRate(time,rateAry){
    var rate = 0;
    $(rateAry).each(function(){
        if(time == this.time){
            rate = this.rate;
            return false;
        }
    });
    return rate;
}

function isNumber(event){//判断输入是否为数字
	return (event.charCode>=48&&event.charCode<=57) 
	||  (event.keyCode>=48&&event.keyCode<=57) 
	|| event.charCode==0;
}
function moneyAnimate(money){//金额动画
	var money = parseInt(money);
	var moneyPer = (money-500)/95 + "%";
	var pageObj = $("#planIndex"); 
	var moneyInput = $("#planMoney",pageObj);//输入框
	var moneyBg = $("#moneyBg2",pageObj); 
	var moneyCtr = $("#moneyCtr",pageObj);
	var moneyCtrIco = $("#moneyCtrIco",pageObj);
	var domWidth = $(document).width() - 88;
	moneyInput.val(money);//设置输入框的值
	moneyBg.css("width",moneyPer)//设置背景
	moneyCtrIco.css("left",moneyPer)//设置图标
    localStorage.money = money;
}
//DOM输入框 添加监听事件
function documentControl(){
    $("body")
        .on("focusin",".zz_inp_1 input",function(){
            $(this).parent().addClass("zz_inp_1hot");
        })
        .on("blur",".zz_inp_1 input",function(){
            $(this).parent().removeClass("zz_inp_1hot");
     });
    //禁止页面文字选中
    $("body").on("selectstart",function(){return false;})


}

/*
* title 页面自适应
* */

function pageAutoCss(){
    var height = $(document).height();
    if(height > 480){return false;}
    $("body").attr("id","Hmin").addClass(height);
}


function codeCantGet(){
    //收不到验证码
    $("body").on("tap","#loginCodeCantGet",function(){
        var obj = $(this);
        var pageObj = $.mobile.activePage;
        var htmlDom = $(Mzqb.htmlPart.codeCantGet);
        htmlDom.appendTo(pageObj).children(":first").animate({top:0});
        return false;
    });
    //收不到验证码-取消
    $("body").on("tap","#loginCodeClose",function(){
        var obj = $(this);
        var pageObj = $.mobile.activePage;
        var objSib = obj.parent().find(".zz_list_15");
        objSib.animate({top: -400},"swing",function () {
            obj.parent().remove();
        });
    });
    //收不到验证码-重新获取验证码
    $("body").on("tap","#loginCodeAgain",function(){
        var obj = $(this);
        var pageObj = $.mobile.activePage;
        doAjax({
            url: restAPI.loginCodeAgain,
            success: function (data) {
                if (data.code == "200") {
                    pageObj.find("#loginCodeClose").trigger("tap");
                    pageObj.messageTopTip(Mzqb.htmlPart.loginCode);
                    return false;
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
    });
    //收不到验证码-接听语音验证码
    $("body").on("tap","#loginCodeVoice",function(){
        var obj = $(this);
        var pageObj = $.mobile.activePage;
        doAjax({
            url: restAPI.loginCodeVoice,
            success: function (data) {
                if (data.code == "200") {
                    pageObj.find("#loginCodeClose").trigger("tap");
                    pageObj.messageTopTip(Mzqb.htmlPart.loginCode);
                    return false;
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
    });
}


/*
* @title 创建loading方法
* @param msg 传入html
* */

function showLoading(msg){
   $("#ajaxLoading").show();
}
function hideLoading(){
	$("#ajaxLoading").hide();
}




/*
* @title
* @url
* @data
* @callback
* */

function doAjax(json){
    var url = json.url || "";
    var data = json.data || "";
    var success = json.success || "";
    $.ajax({
        "url":url,
        "data":data,
        "type":"get",
        "cache":false,
        "dataType":"json",
        "beforeSend":function(){
            showLoading();
        },
        "complete":function(){
            hideLoading();
        },
        "success":function(data){
            success(data);
        },
        "error":function(XMLHttpRequest, textStatus, errorThrown){
            alert("获取数据失败");
        }
    })
}



/***************************************************************************************/








function loginIndexControl(){
    var pageObj = $("#loginIndex");
    pageObj.on("pageshow",function(){
        var data = {data:{}};
        pageObj.html(pageObj.getTmpl(data.data));
    });
    pageObj.on("tap","#loginIndexBtn",function(){
        var obj = $(this);
        var pageObj = $("#loginIndex");
        var Dname = pageObj.find("[name='name']").val();
        var Dpassword = pageObj.find("[name='password']").val();
        if(!Mzqb.regRule.loginName.reg.test(Dname)){//验证用户名
            pageObj.messageTopTip(Mzqb.regRule.loginName.msg);
            return false;
        }
        if(!Mzqb.regRule.loginPassword.reg.test(Dpassword)){//验证密码
            pageObj.messageTopTip(Mzqb.regRule.loginPassword.msg);
            return false;
        }
        doAjax({
            url: restAPI.loginIndex,
            data: {
                "name": Dname,
                "password": Dpassword
            },
            success: function (data) {
                var data = data || {};
                if (data.code == "200") {
                    sessionStorage.planIndexLoginMsg = 0;
                    $.mobile.changePage("#accountIndex");
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    });
}
function loginRegisterControl(){
    var pageObj = $("#loginRegister");
    pageObj.on("pageshow",function(){
        var data = {data:{}};
        data.data.name = sessionStorage.loginRegisterName;
        pageObj.html(pageObj.getTmpl(data.data));
        if(sessionStorage.planListLogin == 1){
            $("#loginRegisterBtn",pageObj).trigger("tap");
            sessionStorage.planListLogin = 0;
        }
    });
    pageObj.on("tap","#loginRegisterBtn",function(){
        var name = pageObj.find("[name='name']").val();//获取值
        if(!Mzqb.regRule.loginName.reg.test(name)){//验证用户名
            pageObj.messageTopTip(Mzqb.regRule.loginName.msg);
            return false;
        }
        sessionStorage.loginRegisterName = name;
        doAjax({
            url: restAPI.loginRegister,
            data: {
                "name": name
            },
            success: function (data) {
                if (data.code == "200") {
                    $.mobile.changePage("#loginRegisterCode");
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    });
}
function loginRegisterCodeControl(){
    var pageObj = $("#loginRegisterCode");
    pageObj.on("pageshow",function(){
        var data = {data:{}};
        data.data.name = sessionStorage.loginRegisterName;
        pageObj.html(pageObj.getTmpl(data.data));
    });
    pageObj.on("click","#loginRegisterCodeBtn",function(){
        var name = sessionStorage.loginRegisterName;
        var validCode = pageObj.find("[name='validCode']").val();
        if(!(Mzqb.regRule.validCode.reg.test(validCode))){
            pageObj.messageTopTip(Mzqb.regRule.validCode.msg);
            return false;
        }
        doAjax({
            url: restAPI.loginRegisterCode,
            data: {
                "name": name,
                "validCode": validCode
            },
            success: function (data) {
                if (data.code == "200") {
                    $.mobile.changePage("#loginRegisterName");
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    })
}
function loginRegisterNameControl(){
    var pageObj = $("#loginRegisterName");
    pageObj.on("pageshow",function(){
        pageObj.html(pageObj.getTmpl());
    });
    pageObj.on("tap","#loginRegisterNameBtn",function(){
        var nickName = pageObj.find("[name='nickName']").val();
        var password = pageObj.find("[name='password']").val();
        if(!Mzqb.regRule.nickName.reg.test(nickName)){//验证昵称
            pageObj.messageTopTip(Mzqb.regRule.nickName.msg);
            return false;
        }
        if(!Mzqb.regRule.loginPassword.reg.test(password)){//验证密码
            pageObj.messageTopTip(Mzqb.regRule.loginPassword.msg);
            return false;
        }
        doAjax({
            url: restAPI.loginRegisterName,
            data: {
                "nickName": nickName,
                "password": password
            },
            success: function (data) {
                if (data.code == "200") {
                    $.mobile.changePage("#accountIndex");
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    })
}
function loginForgetControl(){
    var pageObj = $("#loginForget");
    pageObj.on("pageshow",function(){
        var data = {data:{}};
        data.data.name = sessionStorage.loginForgetName || "";
        pageObj.html(pageObj.getTmpl(data.data));
    });
    pageObj.on("tap","#loginForgetBtn",function(){
        var name = pageObj.find("[name='name']").val();//获取值
        if(!Mzqb.regRule.loginName.reg.test(name)){//验证用户名
            pageObj.messageTopTip(Mzqb.regRule.loginName.msg);
            return false;
        }
        sessionStorage.loginForgetName = name;
        doAjax({
            url: restAPI.loginForget,
            data: {
                "name": name
            },
            success: function (data) {
                if (data.code == "200") {
                    $.mobile.changePage("#loginForgetCode");
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    });
}
function loginForgetCodeControl(){
    var pageObj = $("#loginForgetCode");
    pageObj.on("pageshow",function(){
        var data = {data:{}};
        data.data.name = sessionStorage.loginForgetName;
        pageObj.html(pageObj.getTmpl(data.data));
    });
    pageObj.on("tap","#loginForgetCodeBtn",function(){
        var name = sessionStorage.loginForgetName;
        var validCode = pageObj.find("[name='validCode']").val();
        if(!(Mzqb.regRule.validCode.reg.test(validCode))){
            pageObj.messageTopTip(Mzqb.regRule.validCode.msg);
            return false;
        }
        doAjax({
            url:restAPI.loginForgetCode,
            data:{
                "name":name,
                "validCode":validCode
            },
            success:function(data){
                if(data.code == "200"){
                    $.mobile.changePage("#loginForgetSet");
                }else{
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    })
}
function loginForgetSetControl(){
    var pageObj = $("#loginForgetSet");
    pageObj.on("pageshow",function(){
        var data = {data:{}};
        data.data.name = sessionStorage.loginForgetName;
        pageObj.html(pageObj.getTmpl(data.data));
        pageObj.find("[name=password]").focus();
    });
    pageObj.on("tap","#loginForgetSetBtn",function(){
        var name = sessionStorage.loginForgetName;
        var password = pageObj.find("[name='password']").val();
        if(!Mzqb.regRule.loginPassword.reg.test(password)){//验证密码
            pageObj.messageTopTip(Mzqb.regRule.loginPassword.msg);
            return false;
        }
        doAjax({
            url:restAPI.loginForgetSet,
            data:{
                "name":name,
                "password":password
            },
            success:function(data){
                if(data.code == "200"){
                    $.mobile.changePage("#accountIndex");
                }else{
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    })
}

function planIndexControl(){
    var pageObj = $("#planIndex");
    pageObj.on("pageshow",function(){
        var data = {data:{}};
        data.data.money = localStorage.money
        data.data.time = localStorage.time
        data.data.planRate = Mzqb.defauleData.planRate;
        data.data.rate = (Number(localStorage.rate)*100).toFixed(1)+ " %";
        pageObj.html(pageObj.getTmpl(data.data));
        moneyAnimate(data.data.money);//金额动画设置
        $("#monthBox").touchSwipe(23,data.data.time-1,50);//期数动画
        var login = sessionStorage.planIndexLoginMsg || 0;
        if(login == 0){
            doAjax({
                "url": restAPI.planIndex,
                "success": function (data) {
                    sessionStorage.planIndexLoginMsg = 1;
                    if (data.code == "200") {
                        if(data.data.login != 1){
                            setTimeout(function () {
                                pageObj.messageTopTip(Mzqb.htmlPart.planIndexLoginMsg);
                            }, 1000);
                        }
                    }else{
                        pageObj.messageTopTip(data.message);
                        return false;
                    }
                }
            });
        };
        return false;
    });
    pageObj.on("keypress","#planMoney",function(event){
        var obj = $(this);
        if(obj.val().toString().length>4){return false;}//判断长度不超过5位
        if(!isNumber(event)){return false;}//判断是否是数字
    });

    pageObj.on("keyup","#planMoney",function(event){//按键弹起的时候根据值判断指标位置
        var money = $(this).val();
        if(money%100 == 0 && money>=500 && money<=10000 ){
            moneyAnimate(money);
        }
        return false;
    });
    pageObj.on("blur","#planMoney",function(event){//金额失去焦点做验证
        var money = $(this).val();
        if(money%100 == 0 && money>=500 && money<=10000 ){
        }else{
            pageObj.messageTopTip(Mzqb.regRule.planMoney.msg)
        }
        return false;
    });
    pageObj.on("touchstart","#moneyCtr",function(event){//箭头绑定事件
        var obj = $(this);
        var maxWidth = obj.width();
        var selWidth = event.originalEvent.targetTouches[0].clientX - obj[0].offsetLeft;
        var money = Math.round(95*selWidth/maxWidth)*100 + 500;
        moneyAnimate(money);
        $("body").bind("touchmove",function(event){
            var selWidth = event.originalEvent.targetTouches[0].clientX - obj[0].offsetLeft;
            var money = Math.round(95*selWidth/maxWidth)*100 + 500;
            if(money>=500 && money<=10000){
                moneyAnimate(money);
            }
            return false;
        });
        $("body").bind("touchend",function(event){
            $("body").unbind("touchmove touchend");
        })
    });
    pageObj.on("tap","#toLeft",function(){
        var moneyInput = $("#planMoney",pageObj);
        var newMoney = parseInt(moneyInput.val()) - 100;
        if(newMoney >= 500){
            moneyAnimate(newMoney);
        }
        return false;
    });
    pageObj.on("tap","#toRight",function(){
        var moneyInput = $("#planMoney",pageObj);
        var newMoney = parseInt(moneyInput.val()) + 100;
        if(newMoney <= 10000){
            moneyAnimate(newMoney);
        }
        return false;
    });
    pageObj.on("tap","#planIndexBtn",function(){//算一算按钮
        var obj = $(this);
        var money = Number(localStorage.money);
        var time = Number(localStorage.time);
        if(!(Mzqb.regRule.planMoney.reg.test(money) == true && money>=500 && money<=10000)){//验证金额
            pageObj.messageTopTip(Mzqb.regRule.planMoney.msg);
            return false;
        }
        if(!(Mzqb.regRule.planTime.reg.test(time)==true && time>=2 && time <=24)){//验证期数
            pageObj.messageTopTip(Mzqb.regRule.planTime.msg);
            return false;
        }
        $.mobile.changePage("#planList");
        return false;
    });
    return false;
}
function planListControl(){
    var pageObj = $("#planList");
    pageObj.on("pageshow",function(){
        var pageObj = $(this);
        var data = {data:{}};
        var money = Number(localStorage.money);
        var time = Number(localStorage.time);
        var rate = Number(localStorage.rate);
        var planTagHot = localStorage.planName;
        var totalMonth = 0;
        for(var i = time;i>0;i--){
            totalMonth = totalMonth+i;
        }
        var totalDate = totalMonth*30;//计息总天数
        data.data.planRate = Math.round(rate*1000)/10;
        data.data.planPutMoney = time*money;
        data.data.planProfit = Math.round((rate*totalDate/365)*money*100)/100;
        data.data.planOutMoney =  data.data.planPutMoney + data.data.planProfit ;
        data.data.planTag = Mzqb.defauleData.planTag;//设置标签
        data.data.planTagHot = planTagHot;//设置高亮标签
        pageObj.html(pageObj.getTmpl(data.data));
    });
    pageObj.on("tap","#planTagBtn",function(){
        $("#planTag",pageObj)
            .show()
            .find("div:first")
            .animate({
                top:0
            },"swing");
        return false;
    });
    pageObj.on("tap","#planTag a",function(){
        var obj = $(this);
        localStorage.planName = obj.text();
        obj.addClass("hot").siblings().removeClass("hot");
        $("#planTagBtn")
            .removeClass("icon-zz-8")
            .addClass("hot icon-zz-9")
            .text(obj.text());
        $("#planTag")
            .find("div:first")
            .animate({
                top:-400
            },"swing",function(){
                $(this).parent().hide();
            });
        return false;
    });
    pageObj.on("tap","#planListBtn",function(){
        var money = Number(localStorage.money);
        var time = Number(localStorage.time);
        var planTagHot = localStorage.planName;
        if(planTagHot == ""){
            $("#planTagBtn").trigger("tap");
            return false;
        }else{
            doAjax({
                url:restAPI.planList,
                data:{
                    "money":money,
                    "time":time,
                    "planName":planTagHot
                },
                success:function(data){
                    if(data.code == "200"){
                    	if(data.data.login == 1){
                    		$.mobile.changePage("#accountIndex");
                    	}
                    	if(data.data.login == 0){
                            var tmplBox = $("#planListLogin");
                            tmplBox
                                .show()
                                .find("div:first")
                                .html($("#loginRegister").getTmpl())
                                .animate({top:0},"swing");
                            $("#loginRegisterBtn",tmplBox).bind("tap",function(){
                                sessionStorage.loginRegisterName = $("[name='name']",tmplBox).val();
                                sessionStorage.planListLogin = 1;
                                $.mobile.changePage("#loginRegister");
                            });
                    	}
                    }else{
                        pageObj.messageTopTip(data.message);
                        return false;
                    }
                }
            });
        }
        return false;
    });
    pageObj.on("tap","#planListLoginBtn",function(){
        var obj = $(this);
        obj.parent().find("div:first").animate({top:-400},"swing",function(){
            $(this).empty();
            $(this).parent().hide();
        });
        return false;
    });
    return false;
}
function noticeListControl(){
    var pageObj = $("#noticeList");
    pageObj.on("pageshow",function(){
        doAjax({
            url: restAPI.noticeList,
            data:{page:1},
            success: function (data) {
                if (data.code == "200") {
                    pageObj.html(pageObj.getTmpl(data.data));
                    return false;
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        $(window).on("scrollstop",function(){//添加滚动加载方法
            var obj =  $("#noticeListMore");
            if(!obj.is(":visible")){return false;}
            if($("#noticeListMore").offset().top < ($(window).height() + $(window).scrollTop())){
                $("#noticeListMore").trigger("tap");
            }
        })
    });
    pageObj.on("pagehide",function(){
        $(window).off("scrollstop")
    });
    pageObj.on("tap","#noticeListBox li",function(){
        var noticeId = $("#noticeListBox li").attr("data-id");
        localStorage.noticeId = noticeId
        $.mobile.changePage("#noticeDetail");
        return false;
    });
    pageObj.on("tap","#noticeListMore",function(){
        var obj = $(this);
        doAjax({
            url: restAPI.noticeList,
            data:{
                page:Mzqb.noticeListPage || 2
            },
            success: function (data) {
                if (data.code == "200") {
                    var html = "";
                    var rData = data.data.row;
                    for (var i = 0,len = rData.length;i<len;i++){
                        html += '<li data-id="'+rData[i].noticeId+'">'+
                            '<p>'+rData[i].noticeTitle+'</p>'+
                            '<p>'+rData[i].noticeDate+'</p>'+
                            '<p>'+rData[i].noticeContent+'</p>'+
                        '</li>';
                    }
                    $("#noticeListBox").append(html);
                    Mzqb.noticeListPage = data.data.page + 1;
                    if(!data.data.more){
                        obj.hide();
                    }
                }
            }
        });
        return false;
    })
}
function noticeDetailControl(){
    var pageObj = $("#noticeDetail");
    pageObj.on("pageshow",function(){
        var noticeId =  localStorage.noticeId;
        doAjax({
            url: restAPI.noticeDetail,
            data: {
                "noticeId": noticeId
            },
            success: function (data) {
                if (data.code == "200") {
                    pageObj.html(pageObj.getTmpl(data.data));
                    return false;
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
    });
}

function accountIndexControl(){
    var pageObj = $("#accountIndex");
    pageObj.on("pageshow",function(){
        doAjax({
            url: restAPI.accountIndex,
            success: function (data) {
                if (data.code == "200") {
                    pageObj.html(pageObj.getTmpl(data.data));
                    var welcome = sessionStorage.accoutnIndexWelcome || 0;
                    if (!welcome) {//添加用户登录欢迎提示语
                        setTimeout(function () {
                            pageObj.messageTopTip(Mzqb.htmlPart.accoutnIndexWelcome + data.data.nickname);
                        }, 1000);
                        sessionStorage.accoutnIndexWelcome = 1;
                    }
                    return false;
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    });
}
function accountListControl(){
    //页面编辑按钮
    var pageObj = $("#accountList");
    pageObj.on("pageshow",function(){
        var pageObj = $(this);
        doAjax({
            url: restAPI.accountList,
            success: function (data) {
                if (data.code == "200") {
                    pageObj.html(pageObj.getTmpl(data.data));
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
        return false;
    });
    pageObj.on("tap","#accountListEdit",function(){
        var obj = $(this);
        var list = $(".zz_list_5",pageObj);
        if(!obj.hasClass("hot")){
            list.children("div").each(function(){
                $(this).stop().animate({
                    left:0,
                    right:-68
                });
            });
            obj.addClass("hot").html("完成");
            list.find(".waitPay").addClass("disabled");
        }else{
            $(".zz_list_5>div",pageObj).each(function(){
                $(this).stop().animate({
                    left:-68,
                    right:0
                });
            });
            obj.removeClass("hot").html("编辑");
            list.find(".waitPay").removeClass("disabled");
        }
        return false;
    });
    //删除按钮
    pageObj.on("tap",".editDel",function(){
        var obj = $(this);
        var objPar = obj.parent().parent().parent();
        doAjax({
            url: restAPI.accountListDel,
            data: {
                "planId": objPar.attr("data-id")
            },
            success: function (data) {
                if (data.code == "200") {
                    objPar.slideUp(function () {
                        $(this).remove();
                    })
                    return false;
                } else {
                    pageObj.messageTopTip(data.message);
                    return false;
                }
            }
        });
    });
    //待支付按钮
    pageObj.on("tap",".zz_list_5 .waitPay",function(){
        var obj = $(this);
        if(obj.hasClass("disabled")){
            return false;
        }
        pageObj.messageTopTip(Mzqb.htmlPart.waitPay);
    });
    return false;
}













