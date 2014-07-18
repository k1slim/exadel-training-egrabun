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
        quiz.persModule.get(this.statModule.getStats(),this.activeQuestion,quiz.numberOfTest,this.answArr,this.statModule.quizzes);
        this.statModule.updateStats();
    };

    TestModule.prototype.determineAnswNumber=function(e){
        if(e.target.classList.contains('answ') || e.target.id == 'skip')
        {
            this.determinateRightAnswer(e);
            console.log('activeQuestion=',this.activeQuestion,'nTestGlobal=',quiz.numberOfTest,'Answered=',quiz.data[quiz.numberOfTest].questions[this.activeQuestion].Answered);
        }
    };

    TestModule.prototype.determinateRightAnswer=function(e){
        if(e.target.id != 'skip')
        {
            this.statModule.increaseParameter(StatModule.statItems.NUMBER);
            quiz.data[quiz.numberOfTest].questions[this.activeQuestion].Answered=1;
            this.answArr.push(this.activeQuestion);

            if(parseInt(e.target.id)+1==quiz.data[quiz.numberOfTest].questions[this.activeQuestion].right){
                this.statModule.increaseParameter(StatModule.statItems.RIGHT);
                this.logicOfQuestions();
            }
            else{
                this.statModule.increaseParameter(StatModule.statItems.WRONG);
                util.showAlertWindow('open',quiz.data[quiz.numberOfTest].questions[this.activeQuestion].question,1,quiz.data[quiz.numberOfTest].questions[this.activeQuestion].answers[quiz.data[quiz.numberOfTest].questions[this.activeQuestion].right-1],quiz.data[quiz.numberOfTest].questions[this.activeQuestion].answers[parseInt(e.target.id)]);
            }
        }
        else{
            this.logicOfQuestions();
        }
    };

    TestModule.prototype.logicOfQuestions=function(){
        var found = false;

        if(this.statModule.numberOfAnswQuest != quiz.data[quiz.numberOfTest].questions.length+1){

            if(this.activeQuestion==quiz.data[quiz.numberOfTest].questions.length-1){
                for(var j=0;j<quiz.data[quiz.numberOfTest].questions.length;j++){
                    if(!quiz.data[quiz.numberOfTest].questions[j].Answered){
                        this.activeQuestion=j;
                        this.placeQuestions(quiz.data[quiz.numberOfTest].questions[this.activeQuestion]);
                        break;
                    }
                }

            }
            else{
                this.activeQuestion++;

                for(var i=this.activeQuestion;i<quiz.data[quiz.numberOfTest].questions.length;i++){
                    if(!quiz.data[quiz.numberOfTest].questions[i].Answered){
                        found = true;
                        break;
                    }
                }

                if(found === false){
                    this.logicOfQuestions();
                }
                else{
                    this.activeQuestion=i;
                    this.placeQuestions(quiz.data[quiz.numberOfTest].questions[this.activeQuestion]);
                }
            }
        }
         if(this.statModule.numberOfAnswQuest == quiz.data[quiz.numberOfTest].questions.length+1){
         util.showAlertWindow('open','Молодэц,правильных ответов - '+this.statModule.rightAnsw+'.',0);
         this.returnToMainPage();
         }
    };

    TestModule.prototype.returnToMainPage=function(){
        if(this.statModule.numberOfAnswQuest == quiz.data[quiz.numberOfTest].questions.length+1)
            this.statModule.markPassedTest(quiz.numberOfTest);

        util.toggle('leftBlock','open');
        util.toggle('question','close');
        util.toggle('back','close');
        util.toggle('info','close');

        this.activeQuestion=0;
        this.statModule.resetStats();
        this.statModule.updateStats();

        this.answArr=[];
        for(var i=0;i<quiz.data[quiz.numberOfTest].questions.length;i++)
           delete quiz.data[quiz.numberOfTest].questions[i].Answered;
        quiz.persModule.clearStorage();
    };

    TestModule.prototype.defineClosedButtonAction=function(){
        if(this.statModule.numberOfAnswQuest == quiz.data[quiz.numberOfTest].questions.length+1){
            util.showAlertWindow('open','Молодэц,правильных ответов - '+this.statModule.rightAnsw+'.',0);
            this.returnToMainPage();
        }
        else{
            if(this.statModule.numberOfAnswQuest != 0)
                this.logicOfQuestions();
            util.showAlertWindow('close');
        }
    };


    window.TestModule = TestModule;

}(window));
