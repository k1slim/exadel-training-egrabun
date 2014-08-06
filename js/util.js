define(['jquery'],
    function($){

        var util = {};

        util.showAlertWindow = function(data, flag){
            if(flag === 'show'){
                $('#alertWindow').show();
                $('#alertWindowBack').show();
            }
            else{
                $('#alertWindow').hide();
                $('#alertWindowBack').hide();
            }
            $('#textPlaceholder').html(data);
        };

        return util;

    });