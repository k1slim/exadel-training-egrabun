define(['jquery', 'lodash', 'handlebars', 'test', 'stat', 'persistence', 'routing', 'text!../template/templateListTest.hbs'],
    function($, _, Handlebars, testModule, statModule, persModule, router, templateListTest){

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

//            if(persModule.timePers===-1){
//                testModule.time = 9;
//            }
            testModule.changeResources(this.numberOfTest);
//            testModule.timer(testModule.time,$('#placeTimer'),this.data[this.numberOfTest], this.numberOfTest);
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
                router.parseUrl();
                self.pushDataToApp();
            });
            this.contenerWithTests.on("click", ".testStr", function(evt){
                self.determineTestNumber(evt);
            });
            testModule.contenerWithQuestion.on("click", ".answ, #skip", function(evt){
                testModule.determineAnswNumber(evt, self.data[self.numberOfTest], self.numberOfTest);
            });
            testModule.popUpCloseButton.on("click", function(){
                testModule.defineClosedButtonAction(self.data[self.numberOfTest], self.numberOfTest);
            });
            testModule.backButton.on("click", function(){
                testModule.returnToMainPage(self.data[self.numberOfTest], self.numberOfTest);
            });
            this.clearButton.on("click", function(){
                localStorage.removeItem('quizzer');
            });

            this.pushDataToApp();

            if(persModule.actTest !== -1 || router.actQuest !== -1){
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
            statModule.getToStatsModuleQuizzes(persModule.passedTest);
            statModule.updatePassedTestMarker();

            if(persModule.actTest !== -1){
                this.getToConst(persModule.actTest);
                statModule.getToStatsModule(persModule.stat.right, persModule.stat.wrong, persModule.stat.number);
                testModule.getToTestModule(persModule.actQuest, persModule.answArray/*,persModule.timePers*/);

                for(var i = 0; i < testModule.answArr.length; i++){
                    this.data[this.numberOfTest].questions[testModule.answArr[i]].answered = 1;
                }
            }

            if(router.actQuest !== -1){
                router.urlValidation(this.data);
                this.getToConst(router.actTest);
                testModule.activeQuestion = router.actQuest;
            }

            if(persModule.actTest !== -1 && router.actTest !== -1){
                if(router.actTest !== persModule.actTest){
                    statModule.resetStats();
                    testModule.answArr = [];
//                    testModule.time=900;
                    persModule.getToPersModule({}, -1, -1, [], statModule.quizzes/*, 900*/);
                    persModule.pushToLocalStorage();
                }
            }

            if(persModule.actTest !== -1 || router.actQuest !== -1){
                $('#leftBlock').hide();
                $('#question').show();
                $('#back').show();
                $('#info').show();

                $('#titlePlaceholder').html(this.data[this.numberOfTest].title);
                testModule.placeQuestions(this.data[this.numberOfTest], this.numberOfTest);
            }
        };

        QuizzApp.prototype.getToConst = function(nTest){
            this.numberOfTest = nTest;
        };

        return new QuizzApp();

    });