(function(win,$){

    var QuizApp=function(){
        this.contenerWithTests=$('.listTest');

        this.testModule=new TestModule();
        this.persModule=null;
        this.router=null;

        this.numberOfTest=-1;
        this.data={};
    };

    QuizApp.prototype.openTest=function(){
        //$('#leftBlock').toggle();
        //$('#question').toggle();
        //$('#back').toggle();
        //$('#info').toggle();
        util.toggle('leftBlock','close');
        util.toggle('question','open');
        util.toggle('back','open');
        util.toggle('info','open');

        $('#titlePlaceholder').html(this.data[this.numberOfTest].title);
        this.testModule.placeQuestions(this.data[this.numberOfTest],this.numberOfTest);
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

        this.getData("js/json/data.json", function(responseData){
            self.data = responseData;
        });
    };

    QuizApp.prototype.startApp=function(){
        var self=this;

        var template = Handlebars.compile( $('#templateListTest').html() );
        this.contenerWithTests.html( template({test:this.data}) );

        window.addEventListener("hashchange", function(){self.router.parseUrl();self.pushDataToApp()});
        this.contenerWithTests.on("click",function(evt){self.determineTestNumber(evt)});
        this.testModule.contenerWithQuestion.on("click",function(evt){self.testModule.determineAnswNumber(evt,self.data[self.numberOfTest],self.numberOfTest)});
        this.testModule.popUpCloseButton.on("click",function(){self.testModule.defineClosedButtonAction(self.data[self.numberOfTest],self.numberOfTest)});
        this.testModule.backButton.on("click",function(){self.testModule.returnToMainPage(self.data[self.numberOfTest],self.numberOfTest)});

        this.pushDataToApp();

    };

    QuizApp.prototype.getData=function (url,callback){
        var self=this;
        $.getJSON(url,
            function (data) {
                callback(data);
                self.startApp();
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

}(window, jQuery));

window.onload=function(){
    quiz=new QuizzApp();
    quiz.init();
};
