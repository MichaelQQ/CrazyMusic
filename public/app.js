// 用來產生類似 GUID 的字串
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function NewGuid() {
   return (S4()+S4());
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player1;
var player2;
function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player1', {
      height: '100%',
      width: '100%',
      playerVars: { 'controls': 0 },
      videoId: 'FA-ItJcoeFg'
    });

    player2 = new YT.Player('player2', {
      height: '100%',
      width: '100%',
      playerVars: { 'controls': 0 },
      videoId: 'nKS1WTM6fzg'//'UeImh9fVXCs'
    });
}

$(document).ready(function(){

    var key = NewGuid();
    //console.log(key);
    $("#qrcode").append("<img src='https://chart.apis.google.com/chart?chs=300x300&cht=qr&chl=http://crazymusic.herokuapp.com/public/phone.html?key=" + key + "&choe=UTF-8' />");

    // NodeJS Server
    var nodejs_server = "crazymusic.herokuapp.com/";
    // 進行 connect
    var socket = io.connect("https://" + nodejs_server);
    // 偵聽 nodejs 事件
    socket.on('action', function (b) {
        var combine = b.key + "_" + b.act;
        //console.log(combine);
        switch (combine) {
            // 當擁有特定 KEY 的使用者打開手機版網頁，觸發 enter 事件，就會將 qrcode 隱藏，並秀出一張圖
            case key + "_enter":
                $("#qrcode").hide();
                $("#main").show();
                player1.playVideo();
                player2.playVideo();
                player2.mute();
                break;
            // 當擁有特定 KEY 的使用者在手機版網頁中，觸發 changebg 事件，就會將網頁的背景顏色隨機變換
            case key + "_primary":
                //$(".video").toggle();
                $("#player1").show();
                $("#player2").hide();
                player1.unMute();
                player2.mute();
                break;
            case key + "_secondary":
                //$(".video").toggle();
                $("#player1").hide();
                $("#player2").show();
                player1.mute();
                player2.unMute();
                break;
        }
    });
});