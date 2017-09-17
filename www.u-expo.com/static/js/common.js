/* hongz1125@gmail.com */
$(function(){
	if (window.PIE) {
        $('.rounded').each(function(){
            PIE.attach(this);
        });
    }
	$('.quicklink').singlePageNav();	
	$('.zl_list_2 li').hover(
		function(){
			$(this).find("i").stop().animate({width:"100%"});	
		},
		function(){
			$(this).find("i").stop().animate({width:"80px"});		
		}
	);
	$("#history").draggable({axis:"x"});
	$("#jsSildeSmall img").click(function(){
		var no = $("#jsSildeSmall img").index($(this));
		$("#jsSildeBig li").hide();	
		$("#jsSildeBig li:eq("+no+")").show();
	});
	var gridabox = $("#jsPubu");
	gridabox.gridalicious({
		gutter:0,
		width:190,
		animate: true,
		animationOptions: {
				speed: 200,
				duration: 500,
				complete: function(){
					return false;
				}
		}
	});
	$("#jsMoreBox").click(function(){
		$.ajax({
			url:"static/data/morebox.html?v=1",
			data:"html",
			success:function(data){
				var objData = $(data);
				gridabox.gridalicious('append', objData);
			}
		})
	})
	
	
	$('.zl_list_2 li i').each(function(){
		var $object = $(this);
		$object.animate({width:80},1000);
	});
	
	indexBackg();
	
	if($("#jsMoreCont")[0]){
		$(window).bind("scroll",function() {  
			if ($(document).scrollTop() + $(window).height() > $(document).height() - 20) {  
				$.ajax({
					url:"static/data/morebox.html?v=1",
					data:"html",
					success:function(data){
						var objData = $(data);
						gridabox.gridalicious('append', objData);
					}
				}) 
			}  
		})
	}

	
})

//首屏底图切换
function indexBackg(){
	setTimeout(function(){
		$("#zl_list_14").find("img:first").animate({opacity:0},300,function(){
			$("#zl_list_14").find("img:first").appendTo($("#zl_list_14"));
			$("#zl_list_14").find("img:first").animate({opacity:1},500,function(){
				$(this).prependTo($("#zl_list_14"));	
				indexBackg();
			});
		});
	},10000)
}
