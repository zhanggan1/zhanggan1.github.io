/**
 * Created by ijiajia on 2016/6/3.
 */
'use strict';
!(function(window){
    domReady(function(){
        if (!window.applicationCache) {
            var t=confirm('你的浏览器版本不支持HTML5,无法查看网站的全部效果');
        }
        //自适应
        var oNav = document.getElementById('nav');
        var oHear = document.getElementById('hear');
        var oFooter = document.getElementById('footer');
        var oOpa = oNav.getElementsByTagName('div')[0];
        var oP = oHear.getElementsByTagName('p')[0];
        var aSection = document.getElementsByTagName('section');
        var oText = oHear.children[1];
        var aCont = [];
        var oCont = oFooter.children[1];
        for(var i = 0; i< aSection.length; i++){
            aCont.push(aSection[i].children[1]);
        }
        //运动
        move(oText,{'left':-100,'opacity': 0},{'easing': 'ease-out','duration':1000});
        window.onresize = window.onscroll = function(){
            var clientW = document.documentElement.clientWidth;
            var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
            var clientH = document.documentElement.clientHeight + oScroll;
            if(navigator.userAgent.indexOf('MSIE')!=-1){
                oNav.style.position = 'fixed';
            }else{
                oNav.style.top = oScroll +'px';
            }
            if(clientW < 1079){
                oHear.style.width = 1079 +'px';
                oNav.style.width = 1079 +'px';
                oFooter.style.width = 1079 +'px';
                oHear.style.backgroundSize = 1079 +'px auto';
                oFooter.style.backgroundSize = 1079 +'px auto';
                oP.style.right = 10 +'%';
                for(var i = 0; i< aSection.length; i++){
                    aSection[i].style.width = 1079 +'px';
                    aSection[i].style.backgroundSize = 1079 +'px auto';
                }
            }else{
                oHear.style.width = 100 + '%';
                oNav.style.width = 100 +'%';
                oFooter.style.width = 100 +'%';
                oHear.style.backgroundSize = 100 +'% auto';
                oFooter.style.backgroundSize = 100 +'% auto';
                oP.style.right = 4 +'%';
                for(var i = 0; i< aSection.length; i++){
                    aSection[i].style.width = 100 +'%';
                    aSection[i].style.backgroundSize = 100 +'% auto';
                }
            }
            if(clientH >= getPos(aCont[0]).top + 300){
                move(aCont[0],{'left': 0,'opacity': 1});
            }
            if(clientH >= getPos(aCont[1]).top + 300){
                move(aCont[1],{'left': 0,'opacity': 1});
            }
            if(clientH >= getPos(aCont[2]).top + 300){
                move(aCont[2],{'left': 0,'opacity': 1});
            }
            if(clientH >= getPos(oCont).top + 300){
                move(oCont,{'left': 0,'opacity': 1});
            }
        };
        //导航
        var oMenu = document.getElementById('menu');
        var aLi = oMenu.children;
        var aA = oMenu.getElementsByTagName('a');
        var oBlock = aLi[aLi.length-1],
            iSpeed = 0,
            left = 0,
            timer;
        var aSect = document.body.children;
        for(var i = 0; i< aLi.length-1; i++){
            aLi[i].onmouseover = function(){
                if(aLi[i] == aLi[aLi.length-1]){
                    elastic(oBlock,this.offsetLeft-7)
                }else{
                    elastic(oBlock,this.offsetLeft-10)
                }
            };
            aLi[i].onmouseout = function(){
                elastic(oBlock,-10);
            };
            aA[i].index = i;
            var timer2;
            aA[i].onclick = function(){
                var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
                var start = oScroll;
                var dis = getPos(aSect[this.index+1]).top - start;
                var count=Math.floor(500/30);
                var n=0;
                clearInterval(timer2);
                timer2=setInterval(function(){
                    n++;
                    var a=n/count;
                    var cur=start+dis*a;
                    document.documentElement.scrollTop=document.body.scrollTop=cur;
                    if(n==count){
                        clearInterval(timer2);
                    }
                }, 30);
            };
        }
        window.elastic = function(obj,iTarget){
            clearInterval(timer);
            timer = setInterval(function(){
                iSpeed += (iTarget - left)/5;
                iSpeed *= 0.8;
                left += iSpeed;
                obj.style.left = Math.round(left) +'px';

                if(Math.abs(iSpeed) < 1 && Math.round(left) == iTarget){
                    clearInterval(timer);
                }
            },30);
        };
        //时钟
        var oClock = document.getElementById('clock');
        var aImg=oClock.getElementsByTagName('img');

        function clock(){
            var oDate=new Date();
            var str=toDouble(oDate.getHours())+toDouble(oDate.getMinutes())+toDouble(oDate.getSeconds());
            for(var i=0; i<aImg.length; i++){
                move(aImg[i], {top: -35*str.charAt(i)}, {easing: 'linear', duration: 500});
            }
        }
        clock();
        setInterval(clock, 1000);
        //css
        function hoverDir(obj, ev){
            var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var oScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var x=getPos(obj).left+obj.offsetWidth/2-ev.clientX -oScrollLeft;
            var y=getPos(obj).top+obj.offsetHeight/2-ev.clientY -oScrollTop;

            return Math.round((Math.atan2(y, x)*180/Math.PI+180)/90)%4;
        }
        !(function(){
            var oUl=document.getElementById('ul1');
            var aLi=oUl.children;

            for(var i=0; i<aLi.length; i++){
                aLi[i].onmouseenter=function(ev){
                    var oEvent=ev || event;
                    var n=hoverDir(this, oEvent);
                    var oSpan=this.children[2];
                    switch(n){
                        case 0:
                            oSpan.style.left='400px';
                            oSpan.style.top=0;
                            break;
                        case 1:
                            oSpan.style.left=0;
                            oSpan.style.top='400px';
                            break;
                        case 2:
                            oSpan.style.left='-400px';
                            oSpan.style.top=0;
                            break;
                        case 3:
                            oSpan.style.left=0;
                            oSpan.style.top='-400px';
                            break;
                    }
                    move(oSpan, {left: 0, top: 0});
                };
                aLi[i].onmouseleave=function(ev){
                    var oEvent=ev || event;
                    var n=hoverDir(this, oEvent);

                    var oSpan=this.children[2];
                    switch(n){
                        case 0:
                            move(oSpan, {left: 400, top: 0});
                            break;
                        case 1:
                            move(oSpan, {left: 0, top: 400});
                            break;
                        case 2:
                            move(oSpan, {left: -400, top: 0});
                            break;
                        case 3:
                            move(oSpan, {left: 0, top: -400});
                            break;
                    }
                };
            }
        })();
        //js
        var oBox = document.getElementById('box');
        var aBtn = oBox.children[1].children;
        var aDiv = oBox.children[0].children;
        for(var i = 0; i< aBtn.length; i++){
            aBtn[i].index = i;
            aBtn[i].onclick = function(){
                for(var j = 0; j< aBtn.length; j++){
                    aBtn[j].className = '';
                    aDiv[j].className = '';
                }
                this.className = 'active';
                aDiv[this.index].className = 'active';
            };
        }
        //h5
        !(function(){
            var oMi = document.getElementById('mi');
            var oLeft = oMi.children[0].children[0];
            var oRight = oMi.children[0].children[2];
            var aLi = oMi.children[1].children;
            var arr = [];
            for(var i = 0; i< aLi.length; i++){
                arr[i] = aLi[i].className;
            }
            oLeft.onclick = function(){
                arr.push(arr.shift());
                for(var i = 0; i< aLi.length; i++){
                    aLi[i].className = arr[i];
                }
            };
            oRight.onclick = function(){
                arr.unshift(arr.pop());
                for(var i = 0; i< aLi.length; i++){
                    aLi[i].className = arr[i];
                }
            };
        })();
        //兼容IE8
        !(function() {
            if (!
                    /*@cc_on!@*/
                    0) return;
            var e = "audio, canvas, footer, header, menu, meter, nav, progress, section, time, video".split(', ');
            var i= e.length;
            while (i--){
                document.createElement(e[i])
            }
        })()
    });
})(window);