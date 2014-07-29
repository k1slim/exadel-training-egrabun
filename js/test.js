(function(win,$){

    var TestModule=function(){
        this.contenerWithQuestion=$('.textQuest');
        this.popUpCloseButton=$('#closedAlertWindow');
        this.backButton=$('#back');

        this.statModule = new StatModule();

        this.activeQuestion=0;
        this.answArr=[];
    };

    TestModule.prototype.placeQuestions=function(elem,nTest){
        var template = Handlebars.compile($('#template').html());
        this.contenerWithQuestion.html(template(elem.questions[this.activeQuestion]));

        this.changeId(elem);
        this.lockAnswers(this.activeQuestion,this.answArr);

        quiz.persModule.getToPersModule(this.statModule.getStats(),this.activeQuestion,nTest,this.answArr);
        quiz.persModule.pushToLocalStorage();

        quiz.router.getToRouter(this.activeQuestion,nTest);
        quiz.router.pushToURL();

        this.statModule.updateStats(elem,this.activeQuestion);
    };

    TestModule.prototype.determineAnswNumber=function(e,elem,nTest){
        if(e.target.classList.contains('answ') || e.target.id == 'skip'){
            this.determinateRightAnswer(e,elem,nTest);
        }
    };

    TestModule.prototype.determinateRightAnswer=function(e,elem,nTest){
        if(e.target.id != 'skip'){
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
        else
            this.logicOfQuestions(elem,nTest);
    };

    TestModule.prototype.logicOfQuestions=function(elem,nTest){
        var found = false,i;

        if(this.statModule.numberOfAnswQuest != elem.questions.length+1){
            i=(this.activeQuestion==elem.questions.length-1)?0:++this.activeQuestion;

            for(i;i<elem.questions.length;i++)
                if(!elem.questions[i].Answered){
                    found = true;
                    this.activeQuestion=i;
                    this.placeQuestions(elem,nTest);
                    break;
                }

            if(found === false)
                this.logicOfQuestions(elem,nTest);
        }
        else{
            util.showAlertWindow('open','Молодэц,правильных ответов - '+this.statModule.rightAnsw+'.',0);
            this.returnToMainPage(elem,nTest);
        }
    };

    TestModule.prototype.returnToMainPage=function(elem,nTest){
        if(this.statModule.numberOfAnswQuest == elem.questions.length+1)
            this.statModule.markPassedTest(nTest);


        //$('#leftBlock').toggle();
        //$('#question').toggle();
        //$('#back').toggle();
        //$('#info').toggle();
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

    TestModule.prototype.changeId=function(elem){
        var arr=[0,1,2,3,4];
        arr.length=elem.questions[this.activeQuestion].answers.length;
        var temp=_.shuffle(arr);
        for(var i=0;i<elem.questions[this.activeQuestion].answers.length;i++){
                this.contenerWithQuestion.find('li')[i].setAttribute('id',temp[i]+'answ');
                $('#'+temp[i]+'answ').html(elem.questions[this.activeQuestion].answers[temp[i]]);
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
                    var elem=$('#'+j+'answ');
                    elem.removeClass('answ');
                    elem.addClass('lock');
                }
        }
    };


    window.TestModule = TestModule;

}(window,jQuery));
