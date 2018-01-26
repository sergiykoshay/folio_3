$(document).ready(function () {
    var bgArray = [
        'images/header.png',
        'images/header-1.png',
        'images/header-2.png'
    ], i=1;
function bgChange(){

    if(i > (bgArray.length-1)){
        $('.header').animate({'opacity':'0'},200,function(){
            i=1 ;
            $('.header').css({'background-image':'url('+bgArray[0]+')'});
        });
        $('.header').animate({'opacity':'1'},200);
    }else{
        $('.header').animate({'opacity':'0'},200,function(){
            $('.header').css({'background-image':'url('+bgArray[i]+')'});
            i++;
        });
        $('.header').animate({'opacity':'1'},200);
    }
    
}
var intervalCsaHead = setInterval(bgChange,8000);

});