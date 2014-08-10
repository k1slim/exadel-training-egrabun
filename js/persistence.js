define(
    function(){

        var PersModule = function(){
            this.stat = {};
            this.actQuest = -1;
            this.actTest = -1;
            this.answArray = [];
            this.passedTest = [];

            this.parseLocalStorage();
        };

        PersModule.prototype.getToPersModule = function(statObj, actQuest, actTest, answArray, passedTest){
            this.stat = statObj;
            this.actQuest = actQuest;
            this.actTest = actTest;
            this.answArray = answArray;
            this.passedTest = passedTest;
        };

        PersModule.prototype.pushToLocalStorage = function(){
            localStorage.setItem('quizzer', JSON.stringify(this));
        };

        PersModule.prototype.checkLocalStorage = function(){
            return localStorage.quizzer;
        };

        PersModule.prototype.parseLocalStorage = function(){
            if(this.checkLocalStorage()){
                var temp = JSON.parse(localStorage.getItem('quizzer'));
                this.getToPersModule(temp.stat, temp.actQuest, temp.actTest, temp.answArray, temp.passedTest);
            }
            else
                this.getToPersModule({}, -1, -1, [], []);
        };


        return PersModule;

    });
