$(document).ready(function() {
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    // ==========================================================================================================================
    // 建立 Socket IO 連線
    // ==========================================================================================================================
    var socket = io("http://192.168.1.103:8081");//io.connect("http://Nodejs伺服器位置:埠號");
    "undefined" != typeof console && console.log("user enter via mobile");
    // ==========================================================================================================================

    "undefined" != typeof console && console.log("enter mobile page");
    socket.emit("send", {
        key: getUrlVars()["key"],
        act: "enter"
    });

    screen.orientation.lock("landscape");
    screen.orientation.addEventListener("change", function(){
        if(screen.orientation.type == "landscape-primary")
        {
            "undefined" != typeof console && console.log("send change color command");
            socket.emit("send", {
                key: getUrlVars()["key"],
                act: "primary"
            });
            $("#classic").show();
            $("#rock").hide();
        }
        else if(screen.orientation.type == "landscape-secondary")
        {
            "undefined" != typeof console && console.log("send change color command");
            socket.emit("send", {
                key: getUrlVars()["key"],
                act: "secondary"
            });
            $("#classic").hide();
            $("#rock").show();
        }
    });
});