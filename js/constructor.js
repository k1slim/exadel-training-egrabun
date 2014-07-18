(function(win){

    var QuizApp=function(){
        this.contenerWithTests=document.getElementsByClassName('listTest')[0];

        this.testModule=new TestModule();
        this.persModule=null;

        this.numberOfTest=-1;
        this.data={};
    };

    QuizApp.prototype.openTest=function(){
        util.toggle('leftBlock','close');
        util.toggle('question','open');
        util.toggle('back','open');
        util.toggle('info','open');

        util.placeData('titlePlaceholder',this.data[this.numberOfTest].title);
        if(!this.persModule.checkLocalStorage())
            this.testModule.statModule.increaseParameter(StatModule.statItems.NUMBER);
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

        this.getData();
        util.placeInToContainer(this.contenerWithTests,this.data.length,"testStr",'test',0,1);
        util.placeInToContainer(this.testModule.contenerWithQuestion,5,"answ open",'answ',2,0);

        for(var i=0;i<this.data.length;i++){
            util.placeData(i+'test',this.data[i].title);
        }

        this.contenerWithTests.addEventListener("click",function(evt){self.determineTestNumber(evt)});
        this.testModule.contenerWithQuestion.addEventListener("click",function(evt){self.testModule.determineAnswNumber(evt)});
        this.testModule.popUpCloseButton.addEventListener("click",function(){self.testModule.defineClosedButtonAction()});
        this.testModule.backButton.addEventListener("click",function(){self.testModule.returnToMainPage()});
        this.pushPersDataToApp();

    };

    QuizApp.prototype.getData=function ()
    {
        var self = this;

        util.makeGETRequest("js/json/data.json", function(responseData){
            self.data = responseData;
        });
    };

    QuizApp.prototype.pushPersDataToApp=function(){
        if(this.persModule.checkLocalStorage()){
            this.persModule.getFromLocalStorage();

            this.numberOfTest=this.persModule.actTest;
            this.testModule.activeQuestion=this.persModule.actQuest;
            this.testModule.statModule.numberOfAnswQuest=this.persModule.stat.number;
            this.testModule.statModule.rightAnsw=this.persModule.stat.right;
            this.testModule.statModule.wrongAnsw=this.persModule.stat.wrong;
            this.testModule.answArr=this.persModule.answArray;

            this.openTest();

            for(var i=0;i<this.testModule.answArr.length;i++)
                this.data[this.numberOfTest].questions[this.testModule.answArr[i]].Answered=1;
        }
    };


    window.QuizzApp = QuizApp;

}(window));

window.onload=function(){
    quiz=new QuizzApp();
    quiz.init();
};
