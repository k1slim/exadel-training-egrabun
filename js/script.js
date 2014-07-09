(function(root){

    var app={},numb= 0,iter= 0,rightAnsw= 0,wrongAnsw=0;

    app.openTest=function(nTest){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='none';
        elem2.style.display='block';
        app.placeData('numb',++numb);                               //placed a number of question
        app.placeData('titlePlaceholder',quizData[nTest-1].title);  //placed a title of topic
        app.placeQuestions(quizData[nTest-1].questions[0]);
        document.getElementById('Question').addEventListener("click",function(evt){app.getActionElement(evt,nTest)});
    };

    app.getActionElement = function(evt,nTest){
        console.log(evt.target);
        if(evt.target.className=='answ')
        {
            if(parseInt(evt.target.id)==quizData[nTest-1].questions[iter].right)
                app.placeData('rightAnswerCounter',++rightAnsw);
            else
                app.placeData('wrongAnswerCounter',++wrongAnsw);
            iter++;
            app.placeData('numb',++numb);
            console.log('iter=',iter,'nTest=',nTest);
            app.placeQuestions(quizData[nTest-1].questions[iter]);
        }

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

    root.code=app;

}(window));


window.onload=function(){
    var elems=document.getElementsByClassName('testStr');
    for(var i=0;i<elems.length;i++){
        elems[i].innerHTML=quizData[i].title;
        document.getElementById(elems[i].id).addEventListener("click",function(){code.openTest(parseInt(this.id))});
    }
}

