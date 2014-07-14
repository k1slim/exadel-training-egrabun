(function(win){

    var TestModule=function(){
        this.contenerWithQuestion=document.getElementsByClassName('textQuest')[0];
        this.popUpCloseButton=document.getElementById('closedAlertWindow');
        this.placeImage=document.getElementById('placeImage');

        this.numb=0;
        this.iter=0;
        this.rightAnsw=0;
        this.wrongAnsw=0;
        this.skipsQuest=[];
        this.flag=0;
    };


    TestModule.prototype.placeQuestions=function(elem){
        util.placeData('placeQuestionText',elem.question);

        for(var j=0;j<5;j++)
            util.toggle(j+'answ','close');

        if(elem.questionImg)
        {
            util.toggle('placeImage','open');
            this.placeImage.src=elem.questionImg;
        }
        else
            util.toggle('placeImage','close');

        for(var i=0;i<elem.answers.length;i++){
            util.toggle(i+'answ','open');
            util.placeData(i+'answ',elem.answers[i]);
        }
    };

    TestModule.prototype.determineAnswNumber=function(e){
        if(e.target.classList.contains('answ') || e.target.id == 'skip')
        {
            this.determinateRightAnswer(e);

            console.log('iter=',this.iter,'nTestGlobal=',quiz.numberOfTest,'skipsQuestArray=',this.skipsQuest,'flag=',this.flag);

            this.changeFlag();
            this.endOfTest();
            this.searchSkippedQuest();
        }
    };

    TestModule.prototype.determinateRightAnswer=function(e){
        if(e.target.id != 'skip')
        {
            if(parseInt(e.target.id)+1==quiz.data[quiz.numberOfTest].questions[this.iter].right)
                util.placeData('rightAnswerCounter',++this.rightAnsw);
            else{
                util.placeData('wrongAnswerCounter',++this.wrongAnsw);
                this.showAlertWindow('open',quiz.data[quiz.numberOfTest].questions[this.iter].question,1,quiz.data[quiz.numberOfTest].questions[this.iter].answers[quiz.data[quiz.numberOfTest].questions[this.iter].right-1],quiz.data[quiz.numberOfTest].questions[this.iter].answers[parseInt(e.target.id)]);
            }

            util.placeData('numb',++this.numb);
        }
        else
            this.skipsQuest[this.iter]=1;
    };

    TestModule.prototype.changeFlag=function(){
        if(this.iter==quiz.data[quiz.numberOfTest].questions.length-1 && this.flag==0 && this.skipsQuest.length!=0)
        {
            this.flag=1;
            this.showAlertWindow('open','Пропущенные вопросы',0);
        }
        else{
            if(this.numb!=quiz.data[quiz.numberOfTest].questions.length+1){
                this.iter++;
                this.placeQuestions(quiz.data[quiz.numberOfTest].questions[this.iter]);
            }
        }
    };

    TestModule.prototype.endOfTest=function(){
        if(this.numb==quiz.data[quiz.numberOfTest].questions.length+1)
        {
            this.showAlertWindow('open','Молодэц,правильных ответов - '+this.rightAnsw+'.',0);
            this.returnToMainPage();
        }
    };

    TestModule.prototype.searchSkippedQuest=function(){
        if(this.flag==1){
            for(var i=0;i<this.skipsQuest.length;i++){
                if(this.skipsQuest[i]==1){
                    this.skipsQuest[i]=0;
                    this.iter=i;
                    break;
                }
            }

            this.placeQuestions(quiz.data[quiz.numberOfTest].questions[this.iter]);
        }
    };

    TestModule.prototype.returnToMainPage=function(){
        util.toggle('leftBlock','open');
        util.toggle('Question','close');

        this.numb=0;
        this.iter=0;
        this.rightAnsw=0;
        this.wrongAnsw=0;
        this.skipsQuest=[];
        this.flag=0;

        util.placeData('numb',this.numb);
        util.placeData('rightAnswerCounter',this.rightAnsw);
        util.placeData('wrongAnswerCounter',this.wrongAnsw);
    };

    TestModule.prototype.showAlertWindow=function(view,data,flag,rightAnsw,yourAnsw){
        util.toggle('alertWindow',view);
        util.toggle('alertWindowBack',view);

        if(flag!=1)
            util.placeData('textPlaceholder',data);
        else
            util.placeData('textPlaceholder',data+'<br /><br />Вы ответили:<br /> '+yourAnsw+'<br /><br />Правильный ответ:<br /> '+rightAnsw);
    };


    window.TestModule = TestModule;

}(window));
