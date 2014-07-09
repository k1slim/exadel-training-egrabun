(function(root){

    var app={},numb=0;

    app.openTest=function(nTest){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='none';
        elem2.style.display='block';
        numb++;
        app.addInfo('numb',numb);
        app.placeData('titlePlaceholder',quizData[nTest-1].title);
    };

    app.addInfo=function(id,per){
        document.getElementById(id).innerHTML=per;
    };

    app.placeData=function(plhold,data){
        document.getElementById(plhold).innerHTML=data;
    };


   /* app.rightAnsv=function(e){
        var qwerty=document.getElementById('ansv');

    };

    app.addInfo=function(text,flag,rAnsv){

    };*/

    root.code=app;

}(window));


window.onload=function(){
    var elems=document.getElementsByClassName('testStr');
    for(var i=0;i<elems.length;i++){
        document.getElementById(elems[i].id).addEventListener("click",function(){code.openTest(parseInt(this.id))});



    }



}
            /*==Listeners==*/
/*document.getElementById('1test').addEventListener( "click",function(){code.openTest(1)}, false );
document.getElementById('2test').addEventListener( "click", function(){code.openTest(2)}, false );
document.getElementById('3test').addEventListener( "click", function(){code.openTest(3)}, false );
document.getElementById('4test').addEventListener( "click", function(){code.openTest(4)}, false );
document.getElementById('5test').addEventListener( "click", function(){code.openTest(5)}, false );*/

