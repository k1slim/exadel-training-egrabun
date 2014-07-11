(function(win){

   var quizApp=function(){
       this.contenerWithTests=document.getElementsByClassName('listTest')[0];
       this.contenerWithQuestion=document.getElementsByClassName('textQuest')[0];
       this.popUpCloseButton=document.getElementById('closedAlertWindow');
       this.numberOfTest=-1;
       this.numb=0;
       this.iter=0;
       this.rightAnsw=0;
       this.wrongAnsw=0;
       this.skipsQuest=[];
       this.flag=0;
   };

   quizApp.prototype.openTest=function(){
       this.toggle('leftBlock','none');
       this.toggle('Question','block');
       this.placeData('numb',++this.numb);                                      //placed a number of question
       this.placeData('titlePlaceholder',quizData[this.numberOfTest].title);    //placed a title of topic
       this.placeQuestions(quizData[this.numberOfTest].questions[0]);
   };

    quizApp.prototype.placeQuestions=function(elem){
        var place3=document.getElementById('placeImage');
        this.placeData('placeQuestionText',elem.content);
        for(var j=0;j<5;j++)
            this.toggle(j+'answ','none');
        if(elem.image)
        {
            this.toggle('placeImage','block');
            place3.src=elem.image;
        }
        else
            this.toggle('placeImage','none');
        for(var i=0;i<elem.answers.length;i++){
            this.toggle(i+'answ','block');
            this.placeData(i+'answ',elem.answers[i]);
        }
    };

    quizApp.prototype.determineTestNumber=function(e){
        if(e.target.className=='testStr'){
            this.numberOfTest=parseInt(e.target.id);
            this.openTest();
        }
    };

    quizApp.prototype.determineAnswNumber=function(e){
        if(e.target.className=='answ' || e.target.id == 'skip')
        {
            this.determinateRightAnswer(e);
            console.log('iter=',this.iter,'nTestGlobal=',this.numberOfTest,'skipsQuestArray=',this.skipsQuest,'flag=',this.flag);
            this.changeFlag();
            this.endOfTest();
            this.searchSkippedQuest();
        }
    };

    quizApp.prototype.determinateRightAnswer=function(e){
        if(e.target.id != 'skip')
        {
            if(parseInt(e.target.id)+1==quizData[this.numberOfTest].questions[this.iter].right)
                this.placeData('rightAnswerCounter',++this.rightAnsw);
            else{
                this.placeData('wrongAnswerCounter',++this.wrongAnsw);
                this.showAlertWindow('block','qwertyuiopqwertyuiopqwe rtyuiopqwertyuiopqwertyuiopqwe rtyuiopqwertyuiopq wertyuiopqwertyuio pqwertyuiopqwer tyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop',1,quizData[this.numberOfTest].questions[this.iter].right,parseInt(e.target.id)+1);
            }
            this.placeData('numb',++this.numb);
        }
        else
            this.skipsQuest[this.iter]=1;
    };

    quizApp.prototype.changeFlag=function(){
        if(this.iter==quizData[this.numberOfTest].questions.length-1 && this.flag==0 && this.skipsQuest.length!=0)
        {
            this.flag=1;
            this.showAlertWindow('block','Пропущенные вопросы',0);
        }
        else{
            if(this.numb!=quizData[this.numberOfTest].questions.length+1){
                this.iter++;
                this.placeQuestions(quizData[this.numberOfTest].questions[this.iter]);
            }
        }
    };

    quizApp.prototype.endOfTest=function(){
        if(this.numb==quizData[this.numberOfTest].questions.length+1)
        {
            this.showAlertWindow('block','Молодэц,правильных ответов - '+this.rightAnsw+'.',0);
            this.returnToMainPage();
        }
    };

    quizApp.prototype.searchSkippedQuest=function(){
        if(this.flag==1){
            for(var i=0;i<this.skipsQuest.length;i++){
                if(this.skipsQuest[i]==1){
                    this.skipsQuest[i]=0;
                    this.iter=i;
                    break;
                }
            }
            this.placeQuestions(quizData[this.numberOfTest].questions[this.iter]);
        }
    };

    quizApp.prototype.returnToMainPage=function(){
        this.toggle('leftBlock','block');
        this.toggle('Question','none');
        this.numb=0;
        this.placeData('numb',this.numb);
        this.iter=0;
        this.rightAnsw=0;
        this.placeData('rightAnswerCounter',this.rightAnsw);
        this.wrongAnsw=0;
        this.placeData('wrongAnswerCounter',this.wrongAnsw);
        this.skipsQuest=[];
        this.flag=0;
    };

    quizApp.prototype.showAlertWindow=function(view,data,flag,rightAnsw,yourAnsw){
        this.toggle('alertWindow',view);
        this.toggle('alertWindowBack',view);
        if(flag!=1)
            this.placeData('textPlaceholder',data);
        else
            this.placeData('textPlaceholder','Вы ответили: '+yourAnsw+'<br/>Правильный ответ: '+rightAnsw+'<br/><br/>'+data);
    };

    quizApp.prototype.init=function(){
        this.placeInToContainer(this.contenerWithTests,quizData.length,"testStr",'test',0);
        this.placeInToContainer(this.contenerWithQuestion,5,"answ",'answ',2);
        for(var i=0;i<quizData.length;i++){
            this.placeData(i+'test',quizData[i].title);
        }
        this.contenerWithTests.addEventListener("click",function(evt){quiz.determineTestNumber(evt)});
        this.contenerWithQuestion.addEventListener("click",function(evt){quiz.determineAnswNumber(evt)});
        this.popUpCloseButton.addEventListener("click",function(){quiz.showAlertWindow('none',' ')});
    };

            /*Add-on Function*/

    quizApp.prototype.toggle=function(id,spec){
        var elem=document.getElementById(id);
        elem.style.display=spec;
    };

    quizApp.prototype.placeData=function(plhold,data){
        var place=document.getElementById(plhold);
        place.innerHTML=data;
    };

    quizApp.prototype.placeInToContainer=function(place,lenght,clName,id,n){
        var container=document.createElement('ul');
        place.insertBefore(container, place.children[n]);
        for(var i=0;i<lenght;i++){
            var elem=document.createElement('li');
            elem.className=clName;
            elem.setAttribute('id',i+id);
            container.appendChild(elem);
        }
    };


    window.QuizzApp = quizApp;

}(window));

window.onload=function(){
    quiz=new QuizzApp();
    quiz.init();
};
