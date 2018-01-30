function scroll(){

var element = document.querySelectorAll('section');
for (var i = 0; i < element.length; i++) { 
    seen(element[i]);
  }
function seen(e) {
    // Получаем позиции элемента
    e.position = {
      top: window.pageYOffset + e.getBoundingClientRect().top, 
      left: window.pageXOffset + e.getBoundingClientRect().left, 
      right: window.pageXOffset + e.getBoundingClientRect().right, 
      bottom: window.pageYOffset + e.getBoundingClientRect().bottom
    };
    
    // Получаем позиции окна
    window.position = {
      top: window.pageYOffset, 
      left: window.pageXOffset, 
      right: window.pageXOffset + document.documentElement.clientWidth, 
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };
    
    if(e.position.bottom > window.position.top && // Если позиция нижней части элемента больше позиции верхней чайти окна
       e.position.top < window.position.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна
       e.position.right > window.position.left && // Если позиция правой стороны элемента больше позиции левой части окна
       e.position.left < window.position.right){ // Если позиция левой стороны элемента меньше позиции правой чайти окна
      e.classList.add("section--active");
    }else{
        e.classList.remove("section--active");
    };
  };
}; 
  window.onscroll = function() {
    scroll();
  };
  
