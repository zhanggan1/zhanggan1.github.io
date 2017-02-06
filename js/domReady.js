/**
 * Created by Administrator on 2016/12/19.
 */
//DOM加载
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded', function(){
            fn && fn();
        }, false);
    }else{
        document.attachEvent('onreadystatechange', function(){
            if(document.readyState=='complete'){
                fn && fn();
            }
        });
    }
}
//获取生效后样式
function getStyle(obj,name){
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
//运动
function move(obj,json,options){
    //默认样式
    var options  = options || {};
    options.duration = options.duration || 500;
    options.easing = options.easing || 'linear';

    var start = {};
    var dis = {};
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        if(isNaN(start[name])){
            switch(name){
                case "left":
                    start[name] = obj.offsetLeft;
                    break;
                case "top":
                    start[name] = obj.offsetTop;
                    break;
                case "opacity":
                    start[name] = 1;
                    break;
                case "borderWidth":
                    start[name] = 0;
                    break;
            }
        }
        dis[name] = json[name] - start[name];
    }
    //时间
    var count = Math.floor(options.duration/30);
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        n ++;
        for(var name in json){
            switch(options.easing){
                case 'linear':
                    var a = n/count;
                    var cur = start[name] + dis[name] * a;
                    break;
                case 'ease-in':
                    var a = n/count;
                    var cur = start[name] + dis[name] *a*a*a;
                    break;
                case 'ease-out':
                    var a = n/count;
                    var cur = start[name] + dis[name] *(1-a*a*a);
                    break;

            }
            if(name == 'opacity'){
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity = '+cur*100+')'
            }else{
                obj.style[name] = cur + 'px';
            }
        }
        if(n == count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30);
}
function toDouble(n){
    return n<10?'0'+n:''+n;
}
function getPos(obj){
    var t = 0;
    var l = 0;
    while(obj){
        t += obj.offsetTop;
        l += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return {top: t,left: l};
}
