(function(root){

    var app={},numb= 0,iter= 0;

    app.openTest=function(nTest){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='none';
        elem2.style.display='block';
        numb++;
        app.addInfo('numb',numb);
        app.placeData('titlePlaceholder',quizData[nTest-1].title);
        app.placeQuestions(quizData[nTest-1].questions[0]);
        document.getElementById('Question').addEventListener("click",function(evt){app.getActionElement(evt,nTest)});
    };

    app.getActionElement = function(evt,nTest){
        console.log(evt.target);
        if(evt.target.className=='answ')
        {
            iter++;
            console.log(iter,nTest);
            app.placeQuestions(quizData[nTest-1].questions[iter]);
        }

    };

    app.addInfo=function(id,per){
        document.getElementById(id).innerHTML=per;
    };

    app.placeData=function(plhold,data){
        document.getElementById(plhold).innerHTML=data;
    };

    app.placeQuestions=function(elem){
        document.getElementById('placeQuestionTest').innerHTML=elem.content;
        var place=document.getElementsByClassName('answ');
        for(var i=0;i<elem.answers.length;i++){
            app.placeData(place[i].id,elem.answers[i]);
        }
    };

 /*   app.addListener=function(className,flag,nTest){
        var elems=document.getElementsByClassName(className);
        console.log(elems[2].id);
        console.log('iter=',iter);
        console.log(nTest);
        console.log(quizData[nTest-1].questions.length);

        for(var i=0;i<elems.length;i++){
            if(flag==1){
                elems[i].innerHTML=quizData[i].title;
            }
            document.getElementById(elems[i].id).addEventListener("click",function(){app.placeQuestions(quizData[nTest-1].questions[iter],nTest)});
        }



    };*/

    root.code=app;

}(window));


window.onload=function(){
    var elems=document.getElementsByClassName('testStr');
    for(var i=0;i<elems.length;i++){
        elems[i].innerHTML=quizData[i].title;
        document.getElementById(elems[i].id).addEventListener("click",function(){code.openTest(parseInt(this.id));console.log(this);});
    }
}

