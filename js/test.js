(function(win){

    var TestModule=function(){
        this.contenerWithQuestion=document.getElementsByClassName('textQuest')[0];
        this.popUpCloseButton=document.getElementById('closedAlertWindow');
        this.placeImage=document.getElementById('placeImage');
        this.backButton=document.getElementById('back');

        this.statModule = new StatModule();

        this.activeQuestion=0;
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
            this.changeFlag();
            this.searchSkippedQuest();
            console.log('activeQuestion=',this.activeQuestion,'nTestGlobal=',quiz.numberOfTest,'noAnswered=',quiz.data[quiz.numberOfTest].questions[this.activeQuestion].noAnswered,'flag=',quiz.data[quiz.numberOfTest].EndOfTestFlag);
        }
    };

    TestModule.prototype.determinateRightAnswer=function(e){
        if(e.target.id != 'skip')
        {
            if(parseInt(e.target.id)+1==quiz.data[quiz.numberOfTest].questions[this.activeQuestion].right)
                this.statModule.increaseParameter(2);
            else{
                this.statModule.increaseParameter(3);
                util.showAlertWindow('open',quiz.data[quiz.numberOfTest].questions[this.activeQuestion].question,1,quiz.data[quiz.numberOfTest].questions[this.activeQuestion].answers[quiz.data[quiz.numberOfTest].questions[this.activeQuestion].right-1],quiz.data[quiz.numberOfTest].questions[this.activeQuestion].answers[parseInt(e.target.id)]);
            }

            this.statModule.increaseParameter(1);
        }
        else
            quiz.data[quiz.numberOfTest].questions[this.activeQuestion].noAnswered=1;
    };

    TestModule.prototype.changeFlag=function(){
        if(this.activeQuestion==quiz.data[quiz.numberOfTest].questions.length-1 && quiz.data[quiz.numberOfTest].EndOfTestFlag!=1 && this.statModule.numberOfAnswQuest < quiz.data[quiz.numberOfTest].questions.length+1)
        {
            quiz.data[quiz.numberOfTest].EndOfTestFlag=1;
            util.showAlertWindow('open','Пропущенные вопросы',0);
        }
        else{
            if(this.statModule.numberOfAnswQuest!=quiz.data[quiz.numberOfTest].questions.length+1 && quiz.data[quiz.numberOfTest].EndOfTestFlag!=1){
                this.activeQuestion++;
                this.placeQuestions(quiz.data[quiz.numberOfTest].questions[this.activeQuestion]);
            }
        }

        if(this.statModule.numberOfAnswQuest==quiz.data[quiz.numberOfTest].questions.length+1)
        {
            util.showAlertWindow('open','Молодэц,правильных ответов - '+this.statModule.rightAnsw+'.',0);
            this.returnToMainPage();
        }
    };

    TestModule.prototype.searchSkippedQuest=function(){
        if(quiz.data[quiz.numberOfTest].EndOfTestFlag==1){
            for(var i=0;i<quiz.data[quiz.numberOfTest].questions.length;i++){
                if(quiz.data[quiz.numberOfTest].questions[i].noAnswered==1){
                    quiz.data[quiz.numberOfTest].questions[i].noAnswered=0;
                    this.activeQuestion=i;
                    break;
                }
            }
            this.placeQuestions(quiz.data[quiz.numberOfTest].questions[this.activeQuestion]);
        }
    };

    TestModule.prototype.returnToMainPage=function(){
        util.toggle('leftBlock','open');
        util.toggle('question','close');
        util.toggle('back','close');

        this.activeQuestion=0;
        this.statModule.resetStats();
        this.statModule.updateStats();

        for(var i=0;i<quiz.data[quiz.numberOfTest].questions.length;i++)
           delete quiz.data[quiz.numberOfTest].questions[i].noAnswered;
        delete quiz.data[quiz.numberOfTest].EndOfTestFlag;
    };


    window.TestModule = TestModule;

}(window));
