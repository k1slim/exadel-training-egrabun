(function(root){

    var app={},numb=0;

    app.openTest=function(){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='none';
        elem2.style.display='block';
        numb++;
        app.addInfo('numb',numb);
    };

    app.addInfo=function(id,per){
        document.getElementById(id).innerHTML=per;
    };
    app.rightAnsv=function(e){
        var qwerty=document.getElementById('ansv');

    }


    root.code=app;

}(window));

            /*==Listeners==*/
document.getElementById('test1').addEventListener( "click", code.openTest, false );
document.getElementById('test1').addEventListener( "click", code.openTest, false );