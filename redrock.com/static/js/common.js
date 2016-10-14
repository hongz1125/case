/* hongz1125@gmail.com */
$(function(){
	$(".rr_list_10:eq(0) ul:eq(0) li").rotate(315);
	$(".rr_list_10:eq(0) ul:eq(0) .txt").rotate(-315);
	$(".rr_list_10:eq(0) ul:eq(0) li").hover(
		function () {
			$(".rr_list_9").html($(this).attr("alt"));
			$(this).find(".hover").stop().slideDown();
	  	},
		function () {
			$(this).find(".hover").stop().slideUp();
	  	}
	)
	
	//右侧菜单
	$("#showAme").delegate(".rr_list_7_bg .toleft", "click", function(){
		ind = $(".rr_list_7 img").index($(".rr_list_7 img.hover")) - 1;
		if(ind>-1){rightSilde(ind)};
	})
	$("#showAme").delegate(".rr_list_7_bg .toright", "click", function(){
		ind = $(".rr_list_7 img").index($(".rr_list_7 img.hover")) + 1;
		if(ind<$(".rr_list_7 img").length){rightSilde(ind)};
	})	
	$("#showAme").delegate(".rr_list_7 img", "click", function(){
		ind = $(".rr_list_7 img").index($(this));
		rightSilde(ind);	
	})
	
	
	//主要菜单
	$(".rr_list_4 li a").hover(
		function(){
			$(this).stop().animate({"font-size":26},500,"easeOutQuad")	
		},
		function(){
			$(this).stop().animate({"font-size":13},200)	
		}
	)
	$(".rr_list_4 .nobtn").click(function(){
		var obj = $(this);
		var ind = obj.attr("alt");
		var dir = obj.attr("altdo");
		var objpar = $(".rr_list_4 li div").eq(ind);
		var objtop = parseInt(objpar.css("top"));
		var objBigtop = (objpar.find("a").length)*26;
		
		if(dir == "0"){
			objpar.stop().animate({"top":objtop-26},500,"easeOutQuad")	
		}else if(dir == "1"){
			objpar.stop().animate({"top":objtop+26},500,"easeOutQuad")	
		}
	})
	
	//关于我们
	$("#showCom").click(function(){
		$("#showAme").fadeOut(500,function(){
			$("#showPro").fadeIn(1000);
		});
		
		
	})
	$(".rr_list_4 a").click(function(){
		var obj = $(this);
		$("#showPro").fadeOut(500,function(){
			rightData(obj);
		});
	})
	//图片放大
	
	
	//浮动的背景图
	$(window).scroll(function(){
		var scrollT = $(window).scrollTop();
		var sTop = (scrollT+$(window).height())-1383;
		if(sTop>0 && sTop<220){
			var top = (434-sTop*2)+"px" ;
			$(".rr_box_2_bgbot:eq(0)").css({"backgroundPosition":"0 "+top});
		}
		if(scrollT>0 && scrollT<800){
			var top2 = (scrollT-800)*0.25+"px";
			$(".rr_box_1_bg:eq(0)").css({"backgroundPosition":"center "+top2});
		}
	})
	
	//返回首页
	$("#home").click(function(){
		$("#showPro,#showAme").fadeOut();
	})
	
})

//右侧灯片
function rightSilde(index){
	var imgSlist = $(".rr_list_7 img");
	var imgBlist = $(".rr_list_6 a");
	var imgTitle = $(".rr_list_8");
	var index = index;
	imgSlist.removeClass("hover");
	imgSlist.eq(index).addClass("hover");
	$(".rr_list_8").html(imgSlist.eq(index).attr("title"));
	$(".rr_list_7 div").stop().animate({"margin-left":-(index-1)*65});
	imgBlist.removeClass("hover");
	imgBlist.eq(index).addClass("hover");
}


function rightData(obj){
	var obj = obj;
	var caseNo = obj.attr("caseno");
	$("#showAme").hide();
	$.ajax({
		 url: "static/data/cases.js",
		 dataType: "json",
		 success:function(data){
			var cases = data;
			var oneCase = cases[caseNo];
			var oneCaseLen = oneCase.length;
			var html2 = "";
			
			var html = '<div class="rr_box_2_bg"><div class="rr_list_6">';
			for(var i = 0;i<oneCaseLen;i++){
				if(i == 0){var hover = ' class="hover"';}else{var hover="";}
				html +=  '<a href="static/data/'+caseNo+'/big/'+i+'.jpg" rel="prettyPhoto[arr1]" title="'+oneCase[i]+'" '+hover+'><img src="static/data/'+caseNo+'/middle/'+i+'.jpg" alt="'+oneCase[i]+'"/></a>';
				html2 += '<img src="static/data/'+caseNo+'/small/'+i+'.jpg" title="'+oneCase[i]+'" '+hover+'>'
			}
			html += '</div><div class="rr_list_7_bg"><div class="rr_list_7"><div>'
			html += html2;
			html += '</div></div><div class="toleft"></div><div class="toright"></div></div><div class="rr_list_8">'+oneCase[0]+'</div></div>'
			$("#showAme").html(html);
			$("a[rel^='prettyPhoto']").prettyPhoto();
			$("#showAme").fadeIn(1000);
    	/*
		<div class="rr_box_2_bg">
            <div class="rr_list_6">
                <a href="static/images/demo/g1.jpg" rel="prettyPhoto[arr1]" title="This is the description"><img src="static/images/demo/b1.jpg" alt="title001"  class="hover"/></a>
                <a href="static/images/demo/g1.jpg" rel="prettyPhoto[arr1]" title="This is the description" class="hover"><img src="static/images/demo/b2.jpg" alt="title002" /></a>
                <a href="static/images/demo/g1.jpg" rel="prettyPhoto[arr1]" title="This is the description"><img src="static/images/demo/b3.jpg" alt="title003" /></a>
            </div>
            <div class="rr_list_7_bg">
            <div class="rr_list_7">
            	<div>
            	<img src="static/images/demo/s1.jpg" title="title001" class="hover">
                <img src="static/images/demo/s2.jpg" title="title002">
                <img src="static/images/demo/s3.jpg" title="title003">
                </div>
            </div>
            <div class="toleft"></div>
            <div class="toright"></div>
            </div>
            <div class="rr_list_8">f2 Gallery</div>
        </div>
		*/
		}
	})
}



