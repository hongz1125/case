//所有图层
var LAYER = [
  "loading",
  "learning",
  "playing",
  "bombingLayer",
  "winningLayer"
];
//定时器
function gameLayerFrame() {
  var time = new Date().getTime();
  if(time - APP.time > APP.fps && !APP.paused){
    APP.time = time;
    for (var i in LAYER) {
      if (APP.state === "sucBombLayer" || APP.state === "sucWinLayer" || APP.state === "sucEmptyLayer" || APP.state === "sharingLayer") {
        return;
      }
      if (APP.state === LAYER[i]) {
        var div = APP.find(LAYER[i]);
        div.update().childClearDraw();
        break;
      }
    }
  }
  requestAnimationFrame(gameLayerFrame);
}


