/**
 * ITCAST WEB
 * Created by zhousg on 2016/11/27.
 */
/*公用方法的封装*/
//命名空间 itcast 在这对象里面
window.itcast = {};
/*封装的是过渡结束事件方法函数*/
itcast.addTransitionEnd = function(dom,callback){

    if(!dom || typeof dom != 'object') return false;

    dom.addEventListener('webkitTransitionEnd',function(){
        /*相同的业务逻辑*/
        callback && callback();
        /*if(callback){
            callback();
        }*/
    });
    dom.addEventListener('transitionEnd',function(){
        /*相同的业务逻辑*/
        callback && callback();
    });
};
//轮播图
window.onload = function(){
    /*轮播*/
    banner();
}
/*搜索栏*/

function banner(){

    /*轮播图盒子*/
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');

    var addTransition = function(){
        imgBox.style.transition = 'all 0.3s';
        imgBox.style.webkitTransition = 'all 0.3s';
    };
    var removeTransition = function(){
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    };
    var setTranslateX = function(translateX){
        imgBox.style.transform = 'translateX('+translateX+'px)';
        imgBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }


    var index = 1;
    var timer = setInterval(function(){
        index ++;
        addTransition();
        setTranslateX(-index*width);
    },1500);

    itcast.addTransitionEnd(imgBox,function(){

        /*1.1 无缝衔接 滚动*/
        if(index >= 9){
            index = 1;
            /*瞬间定位*/
            removeTransition();
            setTranslateX(-index*width);
        }
        /*1.2 无缝滑动*/
        else if(index <= 0){
            index = 8;
            /*瞬间定位*/
            removeTransition();
            setTranslateX(-index*width);
        }
        setPoint();
    });

    var setPoint = function(){
        for(var i = 0 ; i < points.length ; i++){
            points[i].className = ' ';
        }
        points[index-1].className = 'now';
    };

    /*3.轮播图滑动*/

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    imgBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX
    });

    imgBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;


        removeTransition();
        setTranslateX(-index*width+distanceX);

        isMove = true;
    });

    imgBox.addEventListener('touchend', function (e) {

        if(isMove){
            if(Math.abs(distanceX) < width/3){

                addTransition();
                setTranslateX(-index*width);

            }else{

                if(distanceX > 0){
                    /*右滑*/
                    /*上一张*/
                    index --;

                }else{
                    /*左滑*/
                    /*下一张*/
                    index ++;
                }
                addTransition();
                setTranslateX(-index*width);
            }
        }

        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            addTransition();
            setTranslateX(-index*width);
        },1500);
        startX = 0;
        moveX =0;
        distanceX =0;
        isMove = false;

    });

}

