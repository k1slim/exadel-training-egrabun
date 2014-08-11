define(['jquery', 'lodash', 'handlebars', 'test','stat', 'persistence', 'routing', 'text!../template/templateListTest.hbs'],
    function($, _, Handlebars, TestModule, StatModule, PersModule, Router, templateListTest){

        var QuizzApp = function(){
            this.contenerWithTests = $('.listTest');
            this.clearButton = $('#clear');

            this.numberOfTest = -1;
            this.data = {};
        };

        QuizzApp.prototype.openTest = function(){
            $('#leftBlock').hide();
            $('#question').show();
            $('#back').show();
            $('#info').show();

            TestModule.changeResources(this.numberOfTest);
            //this.testModule.time=900;
            //this.testModule.timer(this.testModule.time,$('#placeTimer'),this.data[this.numberOfTest], this.numberOfTest);
        };

        QuizzApp.prototype.determineTestNumber = function(e){
            this.numberOfTest = parseInt(e.target.id, 10);
            this.openTest();
        };

        QuizzApp.prototype.init = function(){
            var self = this;

            this.getData("js/json/data.json", function(responseData){
                self.data = responseData;

            });
        };

        QuizzApp.prototype.startApp = function(){
            var self = this,
                template = Handlebars.compile(templateListTest);
            this.contenerWithTests.html(template({test: this.data}));

            window.addEventListener("hashchange", function(){
                Router.parseUrl();
                self.pushDataToApp();
            });
            this.contenerWithTests.on("click", ".testStr", function(evt){
                self.determineTestNumber(evt);
            });
            TestModule.contenerWithQuestion.on("click", ".answ, #skip", function(evt){
                TestModule.determineAnswNumber(evt, self.data[self.numberOfTest], self.numberOfTest);
            });
            TestModule.popUpCloseButton.on("click", function(){
                TestModule.defineClosedButtonAction(self.data[self.numberOfTest], self.numberOfTest);
            });
            TestModule.backButton.on("click", function(){
                TestModule.returnToMainPage(self.data[self.numberOfTest], self.numberOfTest);
            });
            this.clearButton.on("click", function(){
                localStorage.removeItem('quizzer');
            });

            this.pushDataToApp();

            if(PersModule.actTest !== -1 || Router.actQuest !== -1){
                this.openTest();
            }

        };

        QuizzApp.prototype.getData = function(url, callback){
            var self = this;
            $.getJSON(url,
                function(data){
                    callback(data);
                    self.startApp();
                });
        };

        QuizzApp.prototype.pushDataToApp = function(){
            StatModule.getToStatsModuleQuizzes(PersModule.passedTest);
            StatModule.updatePassedTestMarker();

            if(PersModule.actTest !== -1){
                this.getToConst(PersModule.actTest);
                StatModule.getToStatsModule(PersModule.stat.right, PersModule.stat.wrong, PersModule.stat.number);
                TestModule.getToTestModule(PersModule.actQuest, PersModule.answArray);

                for(var i = 0; i < TestModule.answArr.length; i++) {
                    this.data[this.numberOfTest].questions[TestModule.answArr[i]].answered = 1;
                }
            }

            if(Router.actQuest !== -1){
                Router.urlValidation(this.data);
                this.getToConst(Router.actTest);
                TestModule.activeQuestion = Router.actQuest;
            }

            if(PersModule.actTest !== -1 && Router.actTest !== -1){
                if(Router.actTest !== PersModule.actTest){
                    StatModule.resetStats();
                    TestModule.answArr = [];
                    PersModule.getToPersModule({}, -1, -1, [], StatModule.quizzes);
                    PersModule.pushToLocalStorage();
                }
            }
            if(PersModule.actTest !== -1 || Router.actQuest !== -1){
                $('#titlePlaceholder').html(this.data[this.numberOfTest].title);
                TestModule.placeQuestions(this.data[this.numberOfTest], this.numberOfTest);
            }
        };

        QuizzApp.prototype.getToConst = function(nTest){
            this.numberOfTest = nTest;
        };

        return new QuizzApp();

    });