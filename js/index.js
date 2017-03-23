/*侧边导航栏*/
var menu = document.querySelector('.menu');
var header = document.querySelector('.header');
var body = document.querySelector('.body');
var navs = document.querySelector('.navs');
var dd = navs.querySelectorAll('dd');

menu.onclick = function () {
    header.classList.toggle('collapse');
    body.classList.toggle('collapse');
    navs.classList.toggle('collapse');

    if(!this.classList.contains('collapsed')) {
        for(var i=0; i<dd.length; i++) {
            dd[i].style.transitionProperty = 'all';
            dd[i].style.transform = 'translate(0)';
        }
    }
    this.classList.toggle('collapsed');
}

window.onLoadImg = function (evt) {
    evt.style.display = 'block'
}
try {
    var buyJump = localStorage.getItem('wap_reader_buying_jump');
    if (buyJump) {
        localStorage.removeItem('wap_reader_buying_jump');
        location.href = buyJump;
    }
} catch (ex) {
}




