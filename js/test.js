define(['jquery', 'lodash', 'handlebars', 'stat', 'util','../bower_components/requirejs-text/text!../template/templateQuest.hbs'],
    function($, _, Handlebars, StatModule, util,templateQuest){

        var TestModule = function(){
            this.contenerWithQuestion = $('.textQuest');
            this.popUpCloseButton = $('#closedAlertWindow');
            this.backButton = $('#back');

            this.statModule = new StatModule();

            this.activeQuestion = 0;
            this.answArr = [];
            //this.time=900;
        };

        TestModule.prototype.placeQuestions = function(elem, nTest){
            var template = Handlebars.compile(templateQuest);
            this.contenerWithQuestion.html(template(elem.questions[this.activeQuestion]));

            this.changeId(elem);
            this.lockAnswers(this.activeQuestion, this.answArr);

            quiz.persModule.getToPersModule(this.statModule.getStats(), this.activeQuestion, nTest, this.answArr, this.statModule.quizzes);
            quiz.persModule.pushToLocalStorage();

            quiz.router.getToRouter(this.activeQuestion, nTest);
            quiz.router.pushToURL();

            this.statModule.updateStats(elem, this.activeQuestion);
        };

        TestModule.prototype.determineAnswNumber = function(e, elem, nTest){
            if(e.target.id !== 'skip'){
                this.statModule.increaseParameter(StatModule.statItems.NUMBER);
                elem.questions[this.activeQuestion].answered = 1;
                this.answArr.push(this.activeQuestion);

                if(parseInt(e.target.id, 10) + 1 === parseInt(elem.questions[this.activeQuestion].right, 10)){
                    this.statModule.increaseParameter(StatModule.statItems.RIGHT);
                    this.logicOfQuestions(elem, nTest);
                }
                else{
                    this.statModule.increaseParameter(StatModule.statItems.WRONG);
                    util.showAlertWindow(elem.questions[this.activeQuestion].question + '<br /><br />Вы ответили:<br />' + elem.questions[this.activeQuestion].answers[parseInt(e.target.id, 10)] + '<br /><br />Правильный ответ:<br />' + elem.questions[this.activeQuestion].answers[elem.questions[this.activeQuestion].right - 1], 'show');
                }
            }
            else
                this.logicOfQuestions(elem, nTest);
        };

        TestModule.prototype.logicOfQuestions = function(elem, nTest){
            var found = false, i;

            if(this.statModule.numberOfAnswQuest !== elem.questions.length + 1){
                i = (this.activeQuestion === elem.questions.length - 1) ? 0 : ++this.activeQuestion;

                for(i; i < elem.questions.length; i++)
                    if(!elem.questions[i].answered){
                        found = true;
                        this.activeQuestion = i;
                        this.placeQuestions(elem, nTest);
                        break;
                    }

                if(found === false)
                    this.logicOfQuestions(elem, nTest);
            }
            else
                this.returnToMainPage(elem, nTest);
        };

        TestModule.prototype.returnToMainPage = function(elem, nTest){
            if(this.statModule.numberOfAnswQuest === elem.questions.length + 1){
                if(this.statModule.rightAnsw >= this.statModule.numberOfAnswQuest - 2){
                    util.showAlertWindow('Молодeц ,правильных ответов - ' + this.statModule.rightAnsw + '/' + (this.statModule.numberOfAnswQuest - 1) + '.<br />Тест сдан!', 'show');
                    this.statModule.markPassedTest(nTest);
                }
                else
                    util.showAlertWindow('Не молодeц ,правильных ответов - ' + this.statModule.rightAnsw + '/' + (this.statModule.numberOfAnswQuest - 1) + '.<br />Тест не сдан!', 'show');
            }

            $('#leftBlock').show();
            $('#question').hide();
            $('#back').hide();
            $('#info').hide();

            //this.time=0;
            this.activeQuestion = 0;
            this.statModule.resetStats();
            this.statModule.updateStats(elem, this.activeQuestion);

            this.answArr = [];
            for(var i = 0; i < elem.questions.length; i++)
                delete elem.questions[i].answered;

            quiz.persModule.getToPersModule({}, -1, -1, [], this.statModule.quizzes);
            quiz.persModule.pushToLocalStorage();

            quiz.router.clearUrl();
        };

        TestModule.prototype.defineClosedButtonAction = function(elem, nTest){
            if(this.statModule.numberOfAnswQuest === elem.questions.length + 1)
                this.returnToMainPage(elem, nTest);
            else{
                if(this.statModule.numberOfAnswQuest !== 1)
                    this.logicOfQuestions(elem, nTest);
                util.showAlertWindow();
            }
        };

        TestModule.prototype.changeId = function(elem){
            var arr = [0, 1, 2, 3, 4];
            arr.length = elem.questions[this.activeQuestion].answers.length;
            var temp = _.shuffle(arr);
            for(var i = 0; i < temp.length; i++){
                this.contenerWithQuestion.find('li')[i].setAttribute('id', temp[i] + 'answ');
                $('#' + temp[i] + 'answ').html(elem.questions[this.activeQuestion].answers[temp[i]]);
            }
        };

        TestModule.prototype.getToTestModule = function(aQuest, aArr){
            this.activeQuestion = aQuest;
            this.answArr = aArr;
        };

        TestModule.prototype.lockAnswers = function(aQuest, aArr){
            for(var i = 0; i < aArr.length; i++){
                if(aQuest === aArr[i])
                    for(var j = 0; j < 5; j++){
                        var elem = $('#' + j + 'answ');
                        elem.removeClass('answ');
                        elem.addClass('lock');
                    }
            }
        };

        /*TestModule.prototype.timer = function(sec, block, elem, nTest){
         var self = this,
         time = sec;

         console.log(sec);

         var hour = parseInt(time / 3600);
         if(hour < 1)
         hour = 0;
         time = parseInt(time - hour * 3600);
         if(hour < 10)
         hour = '0' + hour;

         var minutes = parseInt(time / 60);
         if(minutes < 1)
         minutes = 0;
         time = parseInt(time - minutes * 60);
         if(minutes < 10)
         minutes = '0' + minutes;

         var seconds = time;
         if(seconds < 10)
         seconds = '0' + seconds;

         block.html(hour + ':' + minutes + ':' + seconds);

         sec--;

         if(this.time===0)
         return;

         if(sec > 0){
         setTimeout(function(){
         self.timer(sec, block, elem, nTest)
         }, 1000);
         }
         else{
         this.returnToMainPage(elem, nTest);
         }

         };*/


        return TestModule;

    });
