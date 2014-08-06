define(['jquery', 'lodash', 'handlebars', 'test', 'persistence', 'routing', '../bower_components/requirejs-text/text!../template/templateListTest.hbs'],
    function($, _, Handlebars, TestModule, PersModule, Router, templateListTest){

        var QuizzApp = function(){
            this.contenerWithTests = $('.listTest');
            this.clearButton = $('#clear');

            this.testModule = null;
            this.persModule = null;
            this.router = null;

            this.numberOfTest = -1;
            this.data = {};
        };

        QuizzApp.prototype.openTest = function(){
            $('#leftBlock').hide();
            $('#question').show();
            $('#back').show();
            $('#info').show();

            $('#titlePlaceholder').html(this.data[this.numberOfTest].title);
            this.testModule.placeQuestions(this.data[this.numberOfTest], this.numberOfTest);
            //this.testModule.time=900;
            //this.testModule.timer(this.testModule.time,$('#placeTimer'),this.data[this.numberOfTest], this.numberOfTest);
        };

        QuizzApp.prototype.determineTestNumber = function(e){
            this.numberOfTest = parseInt(e.target.id, 10);
            this.openTest();
        };

        QuizzApp.prototype.init = function(){
            var self = this;

            this.testModule = new TestModule();
            this.persModule = new PersModule();
            this.router = new Router();

            this.getData("js/json/data.json", function(responseData){
                self.data = responseData;

            });
        };

        QuizzApp.prototype.startApp = function(){
            var self = this,
                template = Handlebars.compile(templateListTest);
            this.contenerWithTests.html(template({test: this.data}));

            window.addEventListener("hashchange", function(){
                self.router.parseUrl();
                self.pushDataToApp();
            });
            this.contenerWithTests.on("click", ".testStr", function(evt){
                self.determineTestNumber(evt);
            });
            this.testModule.contenerWithQuestion.on("click", ".answ, #skip", function(evt){
                self.testModule.determineAnswNumber(evt, self.data[self.numberOfTest], self.numberOfTest);
            });
            this.testModule.popUpCloseButton.on("click", function(){
                self.testModule.defineClosedButtonAction(self.data[self.numberOfTest], self.numberOfTest);
            });
            this.testModule.backButton.on("click", function(){
                self.testModule.returnToMainPage(self.data[self.numberOfTest], self.numberOfTest);
            });
            this.clearButton.on("click", function(){
                localStorage.removeItem('quizzer');
            });

            this.pushDataToApp();

            if(this.persModule.actTest !== -1 || this.router.actQuest !== -1){
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
            this.testModule.statModule.getToStatsModuleQuizzes(this.persModule.passedTest);
            this.testModule.statModule.updatePassedTestMarker();

            if(this.persModule.actTest !== -1){
                this.getToConst(this.persModule.actTest);
                this.testModule.statModule.getToStatsModule(this.persModule.stat.right, this.persModule.stat.wrong, this.persModule.stat.number);
                this.testModule.getToTestModule(this.persModule.actQuest, this.persModule.answArray);

                for(var i = 0; i < this.testModule.answArr.length; i++) {
                    this.data[this.numberOfTest].questions[this.testModule.answArr[i]].answered = 1;
                }
            }

            if(this.router.actQuest !== -1){
                this.router.urlValidation(this.data);
                this.getToConst(this.router.actTest);
                this.testModule.activeQuestion = this.router.actQuest;
            }

            if(this.persModule.actTest !== -1 && this.router.actTest !== -1){
                if(this.router.actTest !== this.persModule.actTest){
                    this.testModule.statModule.resetStats();
                    this.testModule.answArr = [];
                    this.persModule.getToPersModule({}, -1, -1, [], this.testModule.statModule.quizzes);
                    this.persModule.pushToLocalStorage();
                }
            }
            if(this.persModule.actTest !== -1 || this.router.actQuest !== -1){
                $('#titlePlaceholder').html(this.data[this.numberOfTest].title);
                this.testModule.placeQuestions(this.data[this.numberOfTest], this.numberOfTest);
            }
        };

        QuizzApp.prototype.getToConst = function(nTest){
            this.numberOfTest = nTest;
        };

        return new QuizzApp();

    });