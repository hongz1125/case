function setPageFontSize(){
    var opt = {
      setSize:function(){//写入基本像素
        var fontsize = window.screen.width/6.4 + "px";
        document.getElementsByTagName('html')[0].style.fontSize = fontsize;
      },
      sEvent:function(){//监听页面resize事件
         window.onresize = _.throttle(opt.setSize,200);
      },
      init:function(){//初始化
          opt.setSize()//对第一次/返回时页面字号做初始化
          opt.sEvent();//ready时执行一边
      }
    };
    opt.init();
}
