$(function() {
	
	resetWH();
	$(window).on("resize",function(){
		resetWH();
	});
	
});


function resetWH(){
	$("html,body").attr("style","font-size:" + $(window).width()/3.2 + "px");
	$(".JSoutBox").height($(window).height());
}