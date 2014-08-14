define(['jquery', 'lodash', 'handlebars', 'stat', 'persistence', 'routing', 'util', 'text!../template/templateQuest.hbs'],
    function($, _, Handlebars, statModule, persModule, router, util, templateQuest){

        var TestModule = function(){
            this.contenerWithQuestion = $('.textQuest');
            this.popUpCloseButton = $('#closedAlertWindow');
            this.backButton = $('#back');

            this.activeQuestion = 0;
            this.answArr = [];
//            this.time = 900;
        };

        TestModule.prototype.placeQuestions = function(elem){
            var template = Handlebars.compile(templateQuest);
            this.contenerWithQuestion.html(template(elem.questions[this.activeQuestion]));

            this.changeId(elem);
            this.lockAnswers(this.activeQuestion, this.answArr);

            statModule.updateStats(elem, this.activeQuestion);
        };

        TestModule.prototype.changeResources = function(nTest){
            persModule.getToPersModule(statModule.getStats(), this.activeQuestion, nTest, this.answArr, statModule.quizzes/*,this.time*/);
            persModule.pushToLocalStorage();

            router.getToRouter(this.activeQuestion, nTest);
            router.pushToURL();
        };

        TestModule.prototype.determineAnswNumber = function(e, elem, nTest){
            if(e.target.id !== 'skip'){
                statModule.increaseParameter(statModule.statItems.NUMBER);
                elem.questions[this.activeQuestion].answered = 1;
                this.answArr.push(this.activeQuestion);

                if(parseInt(e.target.id, 10) + 1 === parseInt(elem.questions[this.activeQuestion].right, 10)){
                    statModule.increaseParameter(statModule.statItems.RIGHT);
                }
                else{
                    statModule.increaseParameter(statModule.statItems.WRONG);
                    util.showAlertWindow(elem.questions[this.activeQuestion].question + '<br /><br />Вы ответили:<br />' + elem.questions[this.activeQuestion].answers[parseInt(e.target.id, 10)] + '<br /><br />Правильный ответ:<br />' + elem.questions[this.activeQuestion].answers[elem.questions[this.activeQuestion].right - 1], 'show');
                }
            }
            if(e.target.id === "skip" || parseInt(e.target.id, 10) + 1 === parseInt(elem.questions[this.activeQuestion].right, 10)){
                this.activeQuestion = this.logicOfQuestions(elem, this.activeQuestion);
                this.changeResources(nTest);
                if(statModule.numberOfAnswQuest === elem.questions.length + 1){
                    this.returnToMainPage(elem, nTest);
                }
            }
        };

        TestModule.prototype.logicOfQuestions = function(elem, n){
            var found = false, i;

            if(statModule.numberOfAnswQuest !== elem.questions.length + 1){
                i = (n < 0 || n >= elem.questions.length - 1) ? 0 : ++n;

                for(i; i < elem.questions.length; i++){
                    if(!elem.questions[i].answered){
                        found = true;
                        n = i;
                        break;
                    }
                }

                if(found === false){
                    n = this.logicOfQuestions(elem, n);
                }
            }
            return n;
        };

        TestModule.prototype.returnToMainPage = function(elem, nTest){
            if(statModule.numberOfAnswQuest === elem.questions.length + 1){
                if(statModule.rightAnsw >= statModule.numberOfAnswQuest - 2){
                    util.showAlertWindow('Молодeц ,правильных ответов - ' + statModule.rightAnsw + '/' + (statModule.numberOfAnswQuest - 1) + '.<br />Тест сдан!', 'show');
                    statModule.markPassedTest(nTest);
                }
                else
                    util.showAlertWindow('Не молодeц ,правильных ответов - ' + statModule.rightAnsw + '/' + (statModule.numberOfAnswQuest - 1) + '.<br />Тест не сдан!', 'show');
            }

            $('#leftBlock').show();
            $('#question').hide();
            $('#back').hide();
            $('#info').hide();

//            this.time = 0;
            this.activeQuestion = 0;
            statModule.resetStats();
            statModule.updateStats(elem, this.activeQuestion);

            this.answArr = [];
            for(var i = 0; i < elem.questions.length; i++)
                delete elem.questions[i].answered;

            persModule.getToPersModule({}, -1, -1, [], statModule.quizzes/*,-1*/);
            persModule.pushToLocalStorage();

            router.clearUrl();
        };

        TestModule.prototype.defineClosedButtonAction = function(elem, nTest){
            if(statModule.numberOfAnswQuest === elem.questions.length + 1)
                this.returnToMainPage(elem, nTest);
            else{
                if(statModule.numberOfAnswQuest !== 1){
                    this.activeQuestion = this.logicOfQuestions(elem, this.activeQuestion);
                    this.changeResources(nTest);
                }
                util.showAlertWindow();
            }
        };

        TestModule.prototype.changeId = function(elem){
            var arr = _.range(5);
            arr.length = elem.questions[this.activeQuestion].answers.length;
            var temp = _.shuffle(arr);
            for(var i = 0; i < temp.length; i++){
                this.contenerWithQuestion.find('li')[i].setAttribute('id', temp[i] + 'answ');
                $('#' + temp[i] + 'answ').html(elem.questions[this.activeQuestion].answers[temp[i]]);
            }
        };

        TestModule.prototype.getToTestModule = function(aQuest, aArr/*, time*/){
            this.activeQuestion = aQuest;
            this.answArr = aArr;
//            this.time=time;
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

//        TestModule.prototype.timer = function(sec, block, elem, nTest){
//            var self = this,
//                time = sec;
//
//            if(this.time === 0)
//                return;
//
//            console.log(sec);
//
//            var hour = parseInt(time / 3600);
//            if(hour < 1)
//                hour = 0;
//            time = parseInt(time - hour * 3600);
//            if(hour < 10)
//                hour = '0' + hour;
//
//            var minutes = parseInt(time / 60);
//            if(minutes < 1)
//                minutes = 0;
//            time = parseInt(time - minutes * 60);
//            if(minutes < 10)
//                minutes = '0' + minutes;
//
//            var seconds = time;
//            if(seconds < 10)
//                seconds = '0' + seconds;
//
//            block.html(hour + ':' + minutes + ':' + seconds);
//
//            sec--;
//            this.time = sec;
//            console.log('t=', this.time);
//
//            if(sec > 0){
//                setTimeout(function(){
//                    self.timer(sec, block, elem, nTest)
//                }, 1000);
//            }
//            else{
//                this.returnToMainPage(elem, nTest);
//            }
//
//        };

        return new TestModule();

    });