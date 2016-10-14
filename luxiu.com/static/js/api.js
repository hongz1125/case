var API = {
	"validateCode":"/static/data/acquireVerifyCode.json",//验证码
	"validateCodeImg":"/static/data/validate_img_code.json",//图片验证码 返回 src 
	"follow":"/static/data/transferFollowOpt.json",//关注api   transferId=149&followType=1
	"search":"/static/data/listcoSuggestion.json",//模糊搜索api  keyword=600
	"messageNewTip":"/static/data/message_new_tip.json",//首页消息提示 返回新消息条数







	"":""
};





var TPL = {

"comfirm":'<section class="lx_pop_bg">\
					<div class="lx_pop_1">\
					    <div class="lx_list_9 tc">{{msg}}</div>\
					    <div class="tc">\
					            <div class="lx_btn_3 doNo">取消</div>\
					            <div class="lx_btn_2 doIt">确定</div>\
					        </div>\
					</div>\
				</section>',

"search":'\
{{each listcoList as value i}}\
<li data-href="project02.html">\
	{{value.shortName}} <i class="lx_font_1">{{value.code}}</i>\
    <span>\
        <i class="iconfont lx_ico_2"></i>\
    </span>\
</li>\
{{/each}}\
',
"loading":'\
<div class="loadingBox" id="loading">\
    <div class="loading">\
        <div class="spinner">\
            <div class="mask">\
                <div class="maskedCircle"></div>\
            </div>\
        </div>\
    </div>\
</div>',

}