(function(win, $){

    var util={};

    util.toggle=function(id,spec){
        var $elem=$('#'+id);
        if(!$elem.hasClass(spec)){
            if(spec=='open'){
                $elem.addClass('open');
                $elem.removeClass('close');
            }
            else{
                $elem.addClass('close');
                $elem.removeClass('open');
            }
        }
    };

    util.showAlertWindow=function(view,data,flag,rightAnsw,yourAnsw){
        util.toggle('alertWindow',view);
        util.toggle('alertWindowBack',view);
        //$('#alertWindow').toggle();
        //$('#alertWindowBack').toggle();
        if(flag!=1)
            $('#textPlaceholder').html(data);
        else
            $('#textPlaceholder').html(data+'<br /><br />Вы ответили:<br /> '+yourAnsw+'<br /><br />Правильный ответ:<br /> '+rightAnsw);
    };


win.util = util;

}(window, jQuery));