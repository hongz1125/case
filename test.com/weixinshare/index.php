<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxa6a7d79370b20294", "1ce07039826d1e1b7c6a54602d640c35");
$signPackage = $jssdk->
GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>111</title>
  <meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
</head>
<body>
  <input type="hidden" id="wx-appId" value='<?php echo $signPackage["appId"];?>'/>
  <input type="hidden" id="wx-timestamp" value='<?php echo $signPackage["timestamp"];?>'/>
  <input type="hidden" id="wx-nonceStr" value='<?php echo $signPackage["nonceStr"];?>'/>
  <input type="hidden" id="wx-signature" value='<?php echo $signPackage["signature"];?>'/>
  <input type="hidden" id="wx-jsApiList" value='onMenuShareTimeline,onMenuShareQQ,onMenuShareAppMessage,onMenuShareWeibo'/>

  <input type="hidden" id="wx-share-title" value="分享标题1"/>
  <input type="hidden" id="wx-share-desc" value="分享描述2"/>
  <input type="hidden" id="wx-share-link" value="http://www.163.com"/>
  <input type="hidden" id="wx-share-imgUrl" value="https://www.baidu.com/img/bdlogo.png"/>


  <button id="a3" style="width:200px;height:200px;">333</button>
  <button id="a4">444</button>
  <script type="text/javascript" src="http://libs.useso.com/js/jquery/2.1.1-rc2/jquery.min.js"></script>
  <script type="text/javascript" src="http://libs.useso.com/js/require.js/2.1.9/require.min.js" data-main="index"></script>

</body>
</html>