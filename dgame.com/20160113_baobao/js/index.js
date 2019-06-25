  var APP = new Body('dz');
  //写入页面比率
  var SIZE = getSize(480, 720, 640 / 480, APP.dom)
  $(function() {



    //获取登陆状态
    getUserLogin();

    APP.state = null; //游戏状态
    APP.stateLoading = 0;
    //设置页面字号
    setPageFontSize();



    //阻止默认滚动
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);

    //loading 之前
    getImagesLoading(DATA.imagesLoadAry, loadImgReady);



  });
