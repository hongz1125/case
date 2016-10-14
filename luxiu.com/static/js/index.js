
$(function(){
	//解决click延迟
	FastClick.attach(document.body);

	//所有监听事件
	allTouch();


	//消息页 定时器请求
	getMessageNew();

	//默认自动点击一次
	$("body").find("[data-autoclick=true]").trigger("click");

	
	//获取新消息提示
	getMessageNewTip();

	//如果是图片验证码 默认进行一次异步
	doGetImgValidateCode();


});



//全局触发事件
function allTouch(){
	var body = $("body");

	//是否关注
	body.on('click','[data-follow]',function(){
		doFollow($(this));
		return false;
	});

	//超链
	body.on("click","[data-href]",function(){//所有的跳转链接
		var _this = $(this);
		window.location.href = _this.data("href");
		return false;
	});


	//提交
	body.on("click","[data-submit]",function(){
		var _this = $(this);
		var $form = $(_this.data("submit"));
		var valiSuccess = doFormVali($form);
		if(valiSuccess == true){
			$form.submit();
			return false;
		}else{
			showTip(valiSuccess);
			return false;
		}
	});

	//验证码 - 通用
	body.on("click","#getVali",function(){
		doGetValidateCode($(this));
		return false;
	});
	//验证码 - 图片
	body.on("click","#getImgVali",function(){
		doGetImgValidateCode();
		return false;
	})


	//切换价格方式
	body.on("click",'[data-pricetype]',function(){
		doChangeMoney($(this));
		return false;
	});



	//显示提示层
	body.on("click","[data-tip]",function(){
		showTip($(this).data("tip"));
		return false;
	});
	//显示固定提示层
	body.on("click","[data-fix-tip]",function(){
		showFixTip($(this).data("fix-tip"));
		return false;
	});



	//多选交互
	body.on("click","[data-checkbox]",function(){
		doCheckBox($(this));
		return false;
	});

	//li多选交互
	body.on("click","[data-checkbox-li]",function(){
		doCheckBoxLi($(this));
		return false;
	});

	//单选交互
	body.on("click","[data-radio]",function(){
		doRadio($(this));
		return false;
	});

	//我发布的项目 - 申请下架
	body.on("click","#regClose",function(){
		showConfirm("确定申请下架该项目吗？",function(){
			window.location.href='mypub03.html';
		});
	});
	
	//我发布的项目 - 标记完成
	body.on("click","#regDone",function(){
		showConfirm("确定申请标记该项目已完成吗？",function(){
			window.location.href='mypub02.html';
		});
	});

	//模糊搜索
	body.on("input propertychange","#searchInput",function(){
		if($("#searchContent")[0]){//特殊判断
			$("#searchContent").show();
			$("#companyInfo").hide();
			$("#vCode").val("");
		}
		doSearch($(this));
		return false;
	}).on("keypress",function(event){//阻止回车提交
		if (event.keyCode == 13){event.preventDefault();}
	});

	//ajax加载更多
	body.on("click","[data-ajaxpage]",function(){
		doGetAjaxPage($(this));
		return false;
	});

	//ajaxform 表单验证加提交
	body.on("click","[data-ajaxform]",function(){
		doAjaxForm($(this).closest("form"));
		return false;
	});

	//发布页 选择行业
	$(body).on("click","[data-selectCode]",function(){
		var _this = $(this);
		$("#vCode").val(_this.data("code"));
		$("#shortName").html(_this.data("shortname"));
		$("#industryName").html(_this.data("industryname"));
		$("#searchInput").val(_this.data("code"));
		$("#searchContent").hide();
		$("#companyInfo").show();
	});
	



	//消息 
	body.on("focus","[data-message-input]",function(){//输入框 - 变大
		$(this).closest("footer").addClass("active");
		$("[data-message-content]").css({paddingBottom:"300px"});
		$('body').stop().animate({scrollTop:$('#last').offset().top},1000);
		return false;
	}).on("click","[data-message-close]",function(){//输入框 - 变小
		$(this).closest("footer").removeClass("active");
		$("[data-message-content]").css({paddingBottom:"120px"});
		return false;
	}).on("click","[data-message-send]",function(){//输入框 - 发送
		var form = $(this).closest("form");
		doAjaxForm(form,callbackMessageSend);
		$('body').stop().animate({scrollTop:$('#last').offset().top},1000);
		return false
	}).on("click","[data-message-list]",function(){//历史列表
		var _this = $(this);
		var form = _this.closest("form");
		_this.removeClass("active");
		doAjaxForm(form,callbackMessageList);
		return false
	});

	//商务合作表单提交
	body.on("click","#joinformbtn",function(){
		var form = $(this).closest("form");
		doAjaxForm(form,callbackJoinform);
		return false
	});


}



//显示错误层tip
function showTip(message){
	var box = $('<section class="lx_box_2"></section>');
	box.append(message).appendTo($("body"));
	box.addClass("active1");
	setTimeout(function(){
		box.addClass("active2");
		setTimeout(function(){
			box.remove();
		},500);
	},2000);
}


//显示错误层tip手动关闭
function showFixTip(message){
	var box = $('<section class="lx_box_2"></section>');
	var closeBtn = $('<i class="iconfont lx_ico_1"></i>');
	box.append(message).append(closeBtn).appendTo($("body"));
	box.addClass("active1");
	closeBtn.click(function(){
		box.addClass("active2");
		setTimeout(function(){
			box.remove();
		},500);
	});
}


//进行表单验证
function doFormVali(form){
	var message = true;
	for(var i in validate){
		if(form.find(i)[0]){//查找是否有该元素
			message = validate[i]($(i));
			if(message != true){
				return message;
			}
		}
	}
	return true;
}
//对单个字段进行验证
function doFieldVal(id){
	var message = true;
	for(var i in validate){
		if(i == id){//查看表单内是否有验证方法
			message = validate[i]($(i));
			if(message != true){
				return message;
			}
			break;
		}
	}
	return true;
}



//验证规则
var validate = {
	"#vphone":function(obj){//手机验证
		var val = obj.val();
		if(/^1\d{10}$/.test(val)){
			return true;
		}
		return "请输入正确的手机号";
	},
	"#vpassword":function(obj){//密码验证
		var val = obj.val();
		if(/^\w{6,20}$/.test(val)){
			return true;
		}
		return "请输入6-20位密码";
	},
	"#vvalidate":function(obj){//验证码验证
		var val = obj.val();
		if(/^\d{4,6}$/.test(val)){
			return true;
		}
		return "请输入4-6位验证码";
	},
	"#vUserName":function(obj){//用户姓名
		var val = obj.val();
		if(2<=val.length && val.length<12){
			return true;
		}
		return "姓名格式错误";
	},
	"#vUserCode":function(obj){//身份证验证
		var val = obj.val();
		if(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val)){
			return true;
		}
		return "身份证格式错误";
	},
	"#vCode":function(obj){//公司代码
		var val = obj.val();
		if(/^\d{6}$/.test(val)){
			return true;
		}
		return "请选择公司代码";
	},
	"#vTtmPe1":function(obj){//ttm第一个
		var val = obj.val();
		if(/^\d{1,6}(?:\.\d{1,2})?$/.test(val)){
			return true;
		}
		return "TTM PE格式错误";
	},
	"#vTtmPe2":function(obj){//ttm 第二个
		var val = obj.val();
		var val1 = parseInt($("#vTtmPe1").val()) || 0;
		var val2 = parseInt(val) || 0;
		if(/^\d{1,6}(?:\.\d{1,2})?$/.test(val) && val2>=val1){
			return true;
		}
		return "TTM PE格式错误";
	},
	"#vDiffPrice1":function(obj){//差价第一个
		var val = obj.val();
		if(/^\d{1,2}(?:\.\d{1,2})?$/.test(val)){
			return true;
		}
		return "价差率格式错误";
	},
	"#vDiffPrice2":function(obj){//差价第二个
		var val = obj.val();
		var val1 = parseInt($("#vDiffPrice1").val()) || 0;
		var val2 = parseInt(val) || 0;
		if(/^\d{1,2}(?:\.\d{1,2})?$/.test(val) && val2>=val1){
			return true;
		}
		return "价差率格式错误";
	},
	"#vBanTime":function(obj){//解禁日期
		var val = obj.val();
		var min = obj.attr("min");
		var max = obj.attr("max");
		if(min && max && val>=min && val<=max){
			return true;
		}
		return "解禁日期错误,请选择大于" + min + "的日期";
	},
	"#vStockNum":function(obj){//股票数量
		var val = obj.val();
		if(/^\d{1,6}(?:\.\d{1,2})?$/.test(val)){
			return true;
		}
		return "股数格式错误";
	},
	"#vPriceType":function(obj){//价格类型
		var type = parseInt(obj.val());
		var val = $.trim($("#"+ obj.attr("id") + type).val());
		if(type == 0 && /^\d{1,6}(?:\.\d{1,2})?$/.test(val) && 0<val){//绝对价格
			return true;
		}
		if(type == 1 && /^(\d\d?(\.\d{1,2})?|100)$/.test(val) && 0<val){//相对价格
			return true;
		}
		if(type == 2){//保密
			return true;
		}
		return "价格格式错误";
	},
	"#vFeedback":function(obj){//用户反馈
		var val = $.trim(obj.val());
		if(val.length != 0){
			return true;
		}
		return "反馈内容不能为空";
	},
	"#vUserMessage":function(obj){//消息 - 用户回复内容验证
		var val = $.trim(obj.val());
		if(val.length != 0){
			return true;
		}
		return "内容不能为空";
	},
	"#vRemark":function(obj){//所有备注
		var val = $.trim(obj.val());
		if(val.length != 0){
			return true;
		}
		return "备注不能为空";
	},
	"#vEmail":function(obj){//邮箱验证
		var val = $.trim(obj.val());
		if(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val)){
			return true;
		}
		return "邮箱格式错误";
	},
	"#vCompany":function(obj){//公司验证
		var val = $.trim(obj.val());
		if(val.length != 0){
			return true;
		}
		return "公司不能为空";
	},
	"#vPosition":function(obj){//职位验证
		var val = $.trim(obj.val());
		if(val.length != 0){
			return true;
		}
		return "职位不能为空";
	},
	"#vJoinName":function(obj){
		var val = $.trim(obj.val());
		if(val.length != 0){
			return true;
		}
		return "姓名不能为空";
	},
	"#vJoinTel":function(obj){
		var val = $.trim(obj.val());
		if(/^1\d{10}$/.test(val)){
			return true;
		}
		return "请输入正确的手机号";
	},




	"":""
}





//关注方法
function doFollow(obj){
	var _this = obj;
	var followType;
	if(_this.hasClass('active')){
		followType = 0;
	}else{
		followType = 1;
	}
	$.ajax({
		url:API.follow,
		data:{'transferId': _this.data('follow'),'followType':followType},
		dataType:"json",
		loading:$(TPL.loading),//这三行为添加loading遮罩层方法
		beforeSend:ajaxBeforeSend,
		complete:ajaxComplete,
		error:ajaxError,//异步失败回调
		success:function(data){
			if(data.result == 0){
				showTip(data.message);
				return false;
			};
			if(followType == 0){
				_this.removeClass("active");
			}else{
				_this.addClass("active");
			}
		}
	});
}


//获取验证码 方法
function doGetValidateCode(obj){
	var _this = obj;
	var mobile = $("#vphone").val();
	var vali = doFieldVal("#vphone");
	if(vali != true){//查看是否符合手机规格
		showTip(vali);
		return false;
	}
	$.ajax({
		url:API.validateCode,
		data:{ mobile: mobile},
		dataType:"json",
		success:function(data){
			if(data.result == 0){
				showTip(data.message);
				return false;
			}
		}
	});
	var time = _this.data("backtime");
	var timeBox = $(".getVali.time").html(time).show();
	cutNum();
	//倒计时 清零
	function cutNum(){
		if(time <= 0){
			timeBox.hide();
			return false;
		}
		time--;
		timeBox.html("重新获取 " +time);
		setTimeout(cutNum,1000)
	}
}
function doGetImgValidateCode(){
	var obj = $("#getImgVali");
	if(!obj[0]){return false;}
	$.ajax({
		url:API.validateCodeImg,
		success:function(data){
			if(data.result == 1){
				obj.attr("src",data.data.src);
			}
		}
	})
}

//切换价格方式 方法
function doChangeMoney(obj){
	var _this = obj;
	if(_this.hasClass("active")){return false;}
	$("[name=priceType]").val(_this.index());
	_this.addClass("active").siblings().removeClass("active");
	$(_this.data("pricetype")).addClass("active").siblings().removeClass("active");
}



//做结果页checkbox
function doCheckBox(obj){
	var title = $("body").find("[data-checkin]");
	var cont = $("body").find("[data-checkall]");
	var li = obj.closest("li");
	if(li.hasClass('active')){
		li.appendTo(cont).removeClass("active").find("[type=checkbox]").removeAttr("checked");
	}else{
		li.appendTo(title).addClass("active").find("[type=checkbox]").attr("checked","checked");
	}
}


//做单选效果
function doRadio(obj){
	var _this = obj;
	if(!_this.hasClass("active")){
		_this.addClass("active").siblings().removeClass('active');
	}
}



//显示一个确认框
function showConfirm(msg,callback){
	var tplData = {msg:msg};
	var tpl = TPL.comfirm;
	var box = $(template.compile(tpl)(tplData));
	box.appendTo("body");
	box.find(".doNo").one("click",function(){
		box.remove();
		return false;
	})
	box.find(".doIt").one("click",function(){
		box.remove();
		callback();
		return true;
	});
}


//ajax搜索
function doSearch(obj){
	var form = obj.closest("form");
	form.ajaxSubmit({
		success:function(data){
			if(data.result == 1){
				$("#searchContent").html(data.data.html);
			}
		}
	});
}

//ajax 获取下一页
function doGetAjaxPage(obj){
	var _this = obj;
	_this.removeClass("active");
	_this.find("form").ajaxSubmit({
		loading:$(TPL.loading),//这三行为添加loading遮罩层方法
		beforeSend:ajaxBeforeSend,
		complete:ajaxComplete,
		success:function(data){
			if(data.result == 1){
				_this.find("[name=nextPageNo]").val(data.data.nextPageNo);
				_this.before($(data.data.html));
				if(data.data.nextPageNo){
					_this.addClass("active");
				}
			}
		}
	});
}

//ajax 表单提交
function doAjaxForm(form,callback){
	var vali = doFormVali(form);
	if(vali != true){
		showTip(vali);
		return false;
	}
	form.ajaxSubmit({
		loading:$(TPL.loading),//这三行为添加loading遮罩层方法
		beforeSend:ajaxBeforeSend,
		complete:ajaxComplete,
		dataType:"json",
		success:function(data){
			if(data.result == 0){
				showTip(data.message);
				return false;
			}
			if(data.result==1){
				if(callback){//如果有回调方法 执行回调
					callback(form,data.data);
					return false;
				}
				if(form.data("link")){//如果有link属性 执行link属性
					window.location.href=form.data("link");
					return false;
				}
			}
		}
	})
}

//ajax loading
function ajaxBeforeSend(){
	this.loading.appendTo("body");
}
function ajaxComplete(){
	this.loading.remove();
}
function ajaxError(data){
	showTip("无法连接到服务器");
	console.log(data);
}

//消息 发送成功后方法
function callbackMessageSend(form,data){
	var box = $("[data-message-content]");
	var html = data.html;
	box.append(html);//插入返回的数据
	$("[data-message-input]").val("");//清空值
}
//消息 获取消息 历史列表
function callbackMessageList(form,data){
	var html = data.html;
	form.after(html);
	if(data.historyMessageId){
		form.find("[data-message-list]").addClass("active");
		form.find("[name=historyMessageId]").val(data.historyMessageId);
	}
}
//消息 定时器
function getMessageNew(){
	var form = $("[data-auto-ajax]");
	if(!form[0]){return false;}
	var time = parseInt(form.data("auto-ajax"));
	var t = function(){
		doAjaxForm(form,function(form,data){
			form.parent().append(data.html);
			$('body').stop().animate({scrollTop:$('#last').offset().top},1000);
			form.find("[name=lasteestMessageId]").val(data.lasteestMessageId);
		});
		setTimeout(t,time);
	};
	t();
}

//最新消息提示 - 轮询
function getMessageNewTip(){
	var messageBox = $(".lx_foot_1").children().eq(2);
	if(!messageBox[0]){
		return false;
	}
	var tip = messageBox.find(".lx_ico_3");
	var getNewTip = function(){
		$.ajax({
			url:API.messageNewTip,
			success:function(data){
				if(data.result == 1){
					if(data.data.newMessage == 0){
						tip.hide();
					}else{
						tip.show();
					}
					setTimeout(getNewTip,5000);
				}
			}
		})
	};
	getNewTip();
}


//商务合作 li checkbox
function doCheckBoxLi(obj){
	if(obj.hasClass("active")){
		obj.removeClass("active");
		obj.find("input[type=checkbox]").removeAttr("checked");
	}else{
		obj.addClass("active");
		obj.find("input[type=checkbox]").attr("checked","checked");
	}
}
//商务合作表单回调
function callbackJoinform(form,data){
	$("#joinformsuccess").fadeIn();
}