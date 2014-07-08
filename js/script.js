(function(root){

    var app={},numb=0;

    app.openTest=function(){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='none';
        elem2.style.display='block';
        numb++;
        alert(numb);
    };

    root.code=app;

}(window));

document.getElementById('test1').addEventListener( "click", code.openTest, false );