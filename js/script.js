(function(root){

    var app={},numb= 0,iter= 0,rightAnsw= 0,wrongAnsw= 0,skipsQuest= [],flag= 0,nTestGlobal;

    app.openTest=function(nTest){
        nTestGlobal=nTest;
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='none';
        elem2.style.display='block';
        app.placeData('numb',++numb);                                     //placed a number of question
        app.placeData('titlePlaceholder',quizData[nTestGlobal-1].title);  //placed a title of topic
        app.placeQuestions(quizData[nTestGlobal-1].questions[0]);
    };

    app.getActionElement = function(evt){
        if(evt.target.className=='answ' || evt.target.id == 'skip')
        {
            if(evt.target.id != 'skip')
            {
                if(parseInt(evt.target.id)==quizData[nTestGlobal-1].questions[iter].right)
                    app.placeData('rightAnswerCounter',++rightAnsw);
                else
                    app.placeData('wrongAnswerCounter',++wrongAnsw);

                app.placeData('numb',++numb);
            }
            else{
                skipsQuest[iter]=1;
            }
            console.log('iter=',iter,'nTestGlobal=',nTestGlobal,skipsQuest,'flag=',flag);

            if(iter==quizData[nTestGlobal-1].questions.length-1 && flag==0)
            {
                flag=1;
                alert('Пропущенные вопросы');
            }
            else{
                iter++;
                app.placeQuestions(quizData[nTestGlobal-1].questions[iter]);
            }
            if(numb==quizData[nTestGlobal-1].questions.length+1)
            {
                alert('End');
                app.returnToMainPage();
            }
            if(flag==1){
                for(var i=0;i<skipsQuest.length;i++){
                    if(skipsQuest[i]==1){
                        skipsQuest[i]=0;
                        console.log('newiter=',i);
                        iter=i;
                        break;
                    }
                }
                app.placeQuestions(quizData[nTestGlobal-1].questions[iter]);
            }
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

    app.returnToMainPage=function(){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='block';
        elem2.style.display='none';
        numb= 0;
        app.placeData('numb',numb);
        iter= 0;
        rightAnsw= 0;
        app.placeData('rightAnswerCounter',rightAnsw);
        wrongAnsw= 0;
        app.placeData('wrongAnswerCounter',wrongAnsw);
        skipsQuest=[];
        flag=0;
    };

    root.code=app;

}(window));


window.onload=function(){
    var elems=document.getElementsByClassName('testStr');
    for(var i=0;i<elems.length;i++){
        elems[i].innerHTML=quizData[i].title;
        document.getElementById(elems[i].id).addEventListener("click",function(){code.openTest(parseInt(this.id))});
    }
    document.getElementById('Question').addEventListener("click",function(evt){code.getActionElement(evt)});
}

