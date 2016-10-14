function MzqbInit(){
    loginIndexControl();
    loginRegisterControl();
    loginRegisterCodeControl();
    loginRegisterNameControl();
    loginForgetControl();
    loginForgetCodeControl();
    loginForgetSetControl();
    planIndexControl();
    planListControl();
    noticeListControl();
    noticeDetailControl();
    accountIndexControl();
    accountListControl();
    documentControl();
    pageAutoCss();
    codeCantGet();
}
$(function(){
    if(location.hash == ""){
        location.hash = "planIndex";
    }
    MzqbInit();//全局初始化
});
