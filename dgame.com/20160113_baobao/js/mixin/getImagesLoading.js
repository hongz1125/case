/*
 * 图片预加载类
    imgLoad(
      imageAry,// [{name:'pic1',src:'http://'}]
      callReady, //可选参数  img json 对象 
      callCenter //可选参数 单前加载、总加载数参数
    })
 *
 * */
function getImagesLoading(imagesAry, imagesCallReady, imagesCallCenter) {
  var len = imagesAry.length;
  var newJson = {};
  var imageIndex = 0;
  for (var i = 0; i < len; i++) {
    var row = imagesAry[i];
    if (row.type === "img") {
      var obj = newJson[row.name] = new Image();
      obj.src = row.src;
      obj.onload = function() {
        imageIndex++;
        imagesCallCenter && imagesCallCenter(imageIndex, len);
        if (imageIndex === len) {
          imagesCallReady && imagesCallReady(newJson);
        }
      }
    }
    if (row.type === "audio") {
      var obj = newJson[row.name] = new Audio();
      obj.src = row.src;
      obj.preload = "auto";
      obj.id = row.name;
      $("body").append(obj);
      imageIndex++;
      imagesCallCenter && imagesCallCenter(imageIndex, len);
      if (imageIndex === len) {
        imagesCallReady && imagesCallReady(newJson);
      }


      // if(typeof obj.onloadeddata === "object"){
      // obj.onloadeddata  = function() {
      // }
      // }else{
      //     j++;
      //     imagesCallCenter && imagesCallCenter(j, len);
      //     if (j === len) {
      //       imagesCallReady && imagesCallReady(newJson);
      //     }
      // }

    }
  }
}
