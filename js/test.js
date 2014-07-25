(function(win){

    var TestModule=function(){
        this.contenerWithQuestion=document.getElementsByClassName('textQuest')[0];
        this.popUpCloseButton=document.getElementById('closedAlertWindow');
        this.placeImage=document.getElementById('placeImage');
        this.backButton=document.getElementById('back');

        this.statModule = new StatModule();

        this.activeQuestion=0;
        this.answArr=[];
    };

    TestModule.prototype.placeQuestions=function(elem,nTest){
        this.changeId();
        util.placeData('placeQuestionText',elem.questions[this.activeQuestion].question);

        for(var j=0;j<5;j++)
           util.toggle(j+'answ','close');

        if(elem.questions[this.activeQuestion].questionImg)
        {
            util.toggle('placeImage','open');
            this.placeImage.src=elem.questions[this.activeQuestion].questionImg;
        }
        else
            util.toggle('placeImage','close');

        for(var i=0;i<elem.questions[this.activeQuestion].answers.length;i++){
            util.toggle(i+'answ','open');
            util.placeData(i+'answ',elem.questions[this.activeQuestion].answers[i]);
        }

        quiz.persModule.getToPersModule(this.statModule.getStats(),this.activeQuestion,nTest,this.answArr);
        quiz.persModule.pushToLocalStorage();

        quiz.router.getToRouter(this.activeQuestion,nTest);
        quiz.router.pushToURL();

        this.statModule.updateStats(elem,this.activeQuestion);
    };

    TestModule.prototype.determineAnswNumber=function(e,elem,nTest){
        if(e.target.classList.contains('answ') || e.target.id == 'skip')
        {
            this.determinateRightAnswer(e,elem,nTest);
            this.unlockAnswers();
        }
    };

    TestModule.prototype.determinateRightAnswer=function(e,elem,nTest){
        if(e.target.id != 'skip')
        {
            this.statModule.increaseParameter(StatModule.statItems.NUMBER);
            elem.questions[this.activeQuestion].Answered=1;
            this.answArr.push(this.activeQuestion);

            if(parseInt(e.target.id)+1==elem.questions[this.activeQuestion].right){
                this.statModule.increaseParameter(StatModule.statItems.RIGHT);
                this.logicOfQuestions(elem,nTest);
            }
            else{
                this.statModule.increaseParameter(StatModule.statItems.WRONG);
                util.showAlertWindow('open',elem.questions[this.activeQuestion].question,1,elem.questions[this.activeQuestion].answers[elem.questions[this.activeQuestion].right-1],elem.questions[this.activeQuestion].answers[parseInt(e.target.id)]);
            }
        }
        else{
            this.logicOfQuestions(elem,nTest);
        }
    };

    TestModule.prototype.logicOfQuestions=function(elem,nTest){
        var found = false;

        if(this.statModule.numberOfAnswQuest != elem.questions.length+1){

            if(this.activeQuestion==elem.questions.length-1){
                for(var j=0;j<elem.questions.length;j++){
                    if(!elem.questions[j].Answered){
                        this.activeQuestion=j;
                        this.placeQuestions(elem,nTest);
                        break;
                    }
                }

            }
            else{
                for(var i=++this.activeQuestion;i<elem.questions.length;i++){
                    if(!elem.questions[i].Answered){
                        found = true;
                        break;
                    }
                }

                if(found === false){
                    this.logicOfQuestions(elem,nTest);
                }
                else{
                    this.activeQuestion=i;
                    this.placeQuestions(elem,nTest);
                }
            }
        }
         if(this.statModule.numberOfAnswQuest == elem.questions.length+1){
             util.showAlertWindow('open','Молодэц,правильных ответов - '+this.statModule.rightAnsw+'.',0);
             this.returnToMainPage(elem,nTest);
         }
    };

    TestModule.prototype.returnToMainPage=function(elem,nTest){
        if(this.statModule.numberOfAnswQuest == elem.questions.length+1)
            this.statModule.markPassedTest(nTest);

        util.toggle('leftBlock','open');
        util.toggle('question','close');
        util.toggle('back','close');
        util.toggle('info','close');

        this.activeQuestion=0;
        this.statModule.resetStats();
        this.statModule.updateStats(elem,this.activeQuestion);

        this.answArr=[];
        for(var i=0;i<elem.questions.length;i++)
           delete elem.questions[i].Answered;

        quiz.persModule.clearLocalStorage();
        quiz.router.clearUrl();
    };

    TestModule.prototype.defineClosedButtonAction=function(elem,nTest){
        if(this.statModule.numberOfAnswQuest == elem.questions.length+1){
            util.showAlertWindow('open','Молодэц,правильных ответов - '+this.statModule.rightAnsw+'.',0);
            this.returnToMainPage(elem,nTest);
        }
        else{
            if(this.statModule.numberOfAnswQuest != 1)
                this.logicOfQuestions(elem,nTest);
            util.showAlertWindow('close');
        }
    };

    TestModule.prototype.changeId=function(){
        var temp=util.getRandomInt();
        for(var i=0;i<5;i++){
            this.contenerWithQuestion.getElementsByTagName('li')[i].setAttribute('id',temp[i]+'answ');
        }
    };

    TestModule.prototype.getToTestModule=function(aQuest,aArr){
        this.activeQuestion=aQuest;
        this.answArr=aArr;
    };

    TestModule.prototype.lockAnswers=function(aQuest,aArr){
        for(var i=0;i<aArr.length;i++){
            if(aQuest==aArr[i])
                for(var j=0;j<5;j++){
                    document.getElementById(j+'answ').classList.remove('answ');
                    document.getElementById(j+'answ').classList.add('lock');
                }
        }
    };

    TestModule.prototype.unlockAnswers=function(){
        for(var j=0;j<5;j++)
        if(!document.getElementById(j+'answ').classList.contains('answ')){
            document.getElementById(j+'answ').classList.add('answ');
            document.getElementById(j+'answ').classList.remove('lock');
        }

    };


    window.TestModule = TestModule;

}(window));
