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
                else{
                    app.placeData('wrongAnswerCounter',++wrongAnsw);
                    app.showAlertWindow('block','qwertyuiopqwertyuiopqwe rtyuiopqwertyuiopqwertyuiopqwe rtyuiopqwertyuiopq wertyuiopqwertyuio pqwertyuiopqwer tyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop',1,quizData[nTestGlobal-1].questions[iter].right,parseInt(evt.target.id));
                }
                app.placeData('numb',++numb);
            }
            else
                skipsQuest[iter]=1;
            console.log('iter=',iter,'nTestGlobal=',nTestGlobal,'skipsQuestArray=',skipsQuest,'flag=',flag);
            if(iter==quizData[nTestGlobal-1].questions.length-1 && flag==0 && skipsQuest.length!=0)
            {
                flag=1;
                app.showAlertWindow('block','Пропущенные вопросы',0);
            }
            else{
                if(numb!=quizData[nTestGlobal-1].questions.length+1){
                    iter++;
                    app.placeQuestions(quizData[nTestGlobal-1].questions[iter]);
                }
            }
            if(numb==quizData[nTestGlobal-1].questions.length+1)
            {
                app.showAlertWindow('block','Молодэц,правильных ответов - '+rightAnsw+'.',0);
                app.returnToMainPage();
            }
            if(flag==1){
                for(var i=0;i<skipsQuest.length;i++){
                    if(skipsQuest[i]==1){
                        skipsQuest[i]=0;
                        iter=i;
                        break;
                    }
                }
                app.placeQuestions(quizData[nTestGlobal-1].questions[iter]);
            }
        }
    };

    app.placeData=function(plhold,data){
        var place=document.getElementById(plhold);
        place.innerHTML=data;
    };

    app.placeQuestions=function(elem){
        var place1=document.getElementById('placeQuestionTest');
        var place2=document.getElementsByClassName('answ');
        var place3=document.getElementById('placeImage');
        for(var j=0;j<5;j++)
            place2[j].style.display='none';
        place1.innerHTML=elem.content;
        if(elem.image)
        {
            place3.style.display='block';
            place3.src=elem.image;
        }
        else
            place3.style.display='none';
        for(var i=0;i<elem.answers.length;i++){
            place2[i].style.display='block';
            app.placeData(place2[i].id,elem.answers[i]);
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
        skipsQuest= [];
        flag= 0;
    };

    app.showAlertWindow=function(view,data,flag,rightAnsw,yourAnsw){
        var elem1=document.getElementById('alertWindow');
        var elem2=document.getElementById('alertWindowBack');
        var place=document.getElementById('textPlaceholder');
        elem1.style.display=view;
        elem2.style.display=view;
        if(flag!=1)
            place.innerHTML=data;
        else
            place.innerHTML='Вы ответили: '+yourAnsw+'<br/>Правильный ответ: '+rightAnsw+'<br/><br/>'+data;
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
    document.getElementById('closedAlertWindow').addEventListener("click",function(){code.showAlertWindow('none',' ')});
};

