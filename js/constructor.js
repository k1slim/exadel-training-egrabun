(function(win){

    var QuizApp=function(){
        this.contenerWithTests=document.getElementsByClassName('listTest')[0];

        this.testModule=new TestModule();
        this.persModule=null;
        this.router=null;

        this.numberOfTest=-1;
        this.data={};
    };

    QuizApp.prototype.openTest=function(){
        util.toggle('leftBlock','close');
        util.toggle('question','open');
        util.toggle('back','open');
        util.toggle('info','open');

        util.placeData('titlePlaceholder',this.data[this.numberOfTest].title);
        this.testModule.placeQuestions(this.data[this.numberOfTest].questions[this.testModule.activeQuestion]);
    };

    QuizApp.prototype.determineTestNumber=function(e){
        if(e.target.className=='testStr'){
            this.numberOfTest=parseInt(e.target.id);
            this.openTest();
        }
    };

    QuizApp.prototype.init=function(){
        var self=this;
        this.persModule=new PersModule();
        this.router=new Router();

        this.getData();
        util.placeInToContainer(this.contenerWithTests,this.data.length,"testStr",'test',0,1);
        util.placeInToContainer(this.testModule.contenerWithQuestion,5,"answ open",'answ',2,0);

        for(var i=0;i<this.data.length;i++){
            util.placeData(i+'test',this.data[i].title);
        }

        window.addEventListener("hashchange", function(){self.router.parseUrl();self.pushDataToApp()});
        this.contenerWithTests.addEventListener("click",function(evt){self.determineTestNumber(evt)});
        this.testModule.contenerWithQuestion.addEventListener("click",function(evt){self.testModule.determineAnswNumber(evt,self.data[self.numberOfTest])});
        this.testModule.popUpCloseButton.addEventListener("click",function(){self.testModule.defineClosedButtonAction(self.data[self.numberOfTest])});
        this.testModule.backButton.addEventListener("click",function(){self.testModule.returnToMainPage(self.data[self.numberOfTest])});

        this.pushDataToApp();
    };

    QuizApp.prototype.getData=function ()
    {
        var self = this;

        util.makeGETRequest("js/json/data.json", function(responseData){
            self.data = responseData;
        });
    };

    QuizApp.prototype.pushDataToApp=function(){
        if(this.persModule.actTest!=-1){
            this.getToConst(this.persModule.actTest);
            this.testModule.statModule.getToStatsModule(this.persModule.stat.right,this.persModule.stat.wrong,this.persModule.stat.number);
            this.testModule.getToTestModule(this.persModule.actQuest,this.persModule.answArray);

            for(var i=0;i<this.testModule.answArr.length;i++)
                this.data[this.numberOfTest].questions[this.testModule.answArr[i]].Answered=1;
        }

        if(this.router.actQuest!=-1){
            this.router.urlValidation(this.data);
            this.getToConst(this.router.actTest);
            this.testModule.activeQuestion=this.router.actQuest;
            this.testModule.lockAnswers(this.testModule.activeQuestion,this.testModule.answArr);
        }

        if(this.persModule.actTest!=-1 && this.router.actQuest!=-1){
            if(this.router.actTest==this.persModule.actTest)
                this.testModule.activeQuestion=this.router.actQuest;
            else{
                this.testModule.statModule.resetStats();
                this.testModule.answArr=[];
                this.persModule.clearLocalStorage();
            }
        }

        if(this.persModule.actTest!=-1 || this.router.actQuest!=-1)
            this.openTest();
    };

    QuizApp.prototype.getToConst=function(nTest){
        this.numberOfTest=nTest;
    };


    window.QuizzApp = QuizApp;

}(window));

window.onload=function(){
    quiz=new QuizzApp();
    quiz.init();
};
