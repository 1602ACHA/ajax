function ajax(opt) {
    //创建
    bar = {
        type: "post",
        url: null,
        data: '',
        async: false,
        success: null,
        arror: function() {}
    }
    var settings = extend({}, bar, opt)
    if (Object.prototype.toString.call(settings.data) === "[object Object]") {
        //把对象转换为字符串
        var str = "";
        var obt = settings.data;
        for (var k in obt) {
            str += k + "=" + obt[k] + "&";
        }
        settings.data = str.slice(0, -1);
    }
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    //需要给富翁器传递参数并且以get来传递
    var getData = "";
    if (settings.type === "get" && settings.data) {
        getData = "?" + encodeURI(settings.data);
    }
    console.log(settings)
    console.log(getData)


    //建立请求

    xhr.open(settings.type, settings.url + getData, settings.async)
        //接受数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            settings.success(xhr.responseText);
        }
    }
    var getPost = null;
    if (settings.data && settings.type === "post") {
        getPost = encodeURI(settings.data);
    }
    //发送请求 
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(getPost);


};

function extend() {
    var ar = arguments;
    for (var i = 1; i < ar.length; i++) {
        for (var j in ar[i]) {
            ar[0][j] = ar[i][j]
        }
    }
    return ar[0]
}