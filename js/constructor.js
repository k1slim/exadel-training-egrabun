(function(win){

   var quizApp=function(){
       this.contenerWithTests=document.getElementsByClassName('listTest')[0];
       this.contenerWithStat=document.getElementsByClassName('info')[0];
       this.contenerWithQuestion=document.getElementsByClassName('textQuest')[0];
       this.numberOfTest=-1;
       this.numb=0;
       this.iter=0;
       this.rightAnsw=0;
       this.wrongAnsw=0;
       this.skipsQuest=[];
       this.flag=0;
   };



   quizApp.prototype.openTest=function(){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='none';
        elem2.style.display='block';
        this.placeData('numb',++this.numb);                                    //placed a number of question
        this.placeData('titlePlaceholder',quizData[this.numberOfTest].title);  //placed a title of topic
        this.placeQuestions(quizData[this.numberOfTest].questions[0]);
   };

   quizApp.prototype.placeInToContainer=function(place,data,clName,id){
        var container=document.createElement('ul');
        place.appendChild(container);
        for(var i=0;i<data.length;i++){
            var elem=document.createElement('li');
            elem.className=clName;
            elem.setAttribute('id',i+id);
            container.appendChild(elem);
        }
   };

    quizApp.prototype.placeData=function(plhold,data){
        var place=document.getElementById(plhold);
        place.innerHTML=data;
    };

    quizApp.prototype.placeQuestions=function(elem){
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
            quizApp.prototype.placeData(place2[i].id,elem.answers[i]);
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
            if(e.target.id != 'skip')
            {
                if(parseInt(e.target.id)==quizData[this.numberOfTest].questions[this.iter].right)
                    this.placeData('rightAnswerCounter',++this.rightAnsw);
                else{
                    this.placeData('wrongAnswerCounter',++this.wrongAnsw);
                    this.showAlertWindow('block','qwertyuiopqwertyuiopqwe rtyuiopqwertyuiopqwertyuiopqwe rtyuiopqwertyuiopq wertyuiopqwertyuio pqwertyuiopqwer tyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop',1,quizData[this.numberOfTest].questions[this.iter].right,parseInt(e.target.id));
                }
                this.placeData('numb',++this.numb);
            }
            else
                this.skipsQuest[this.iter]=1;
            console.log('iter=',this.iter,'nTestGlobal=',this.numberOfTest,'skipsQuestArray=',this.skipsQuest,'flag=',this.flag);
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
            if(this.numb==quizData[this.numberOfTest].questions.length+1)
            {
                this.showAlertWindow('block','Молодэц,правильных ответов - '+this.rightAnsw+'.',0);
                this.returnToMainPage();
            }
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
        }
    };

    quizApp.prototype.returnToMainPage=function(){
        var elem1=document.getElementById('leftBlock');
        var elem2=document.getElementById('Question');
        elem1.style.display='block';
        elem2.style.display='none';
        this.numb= 0;
        this.placeData('numb',this.numb);
        this.iter= 0;
        this.rightAnsw= 0;
        this.placeData('rightAnswerCounter',this.rightAnsw);
        this.wrongAnsw= 0;
        this.placeData('wrongAnswerCounter',this.wrongAnsw);
        this.skipsQuest= [];
        this.flag= 0;
    };

    quizApp.prototype.showAlertWindow=function(view,data,flag,rightAnsw,yourAnsw){
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

    quizApp.prototype.init=function(){
        this.placeInToContainer(this.contenerWithTests,quizData,"testStr",'test');
        for(var i=0;i<quizData.length;i++){
            this.placeData(i+'test',quizData[i].title);
        }
        this.contenerWithTests.addEventListener("click",function(evt){quiz.determineTestNumber(evt)});
        this.contenerWithQuestion.addEventListener("click",function(evt){quiz.determineAnswNumber(evt)});
        document.getElementById('closedAlertWindow').addEventListener("click",function(){quiz.showAlertWindow('none',' ')});
    };

    window.QuizzApp = quizApp;

}(window));

window.onload=function(){
    quiz=new QuizzApp();
    quiz.init();
}
