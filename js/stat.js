(function(win){

    var StatModule=function(){
        this.numberOfAnswQuest=1;
        this.rightAnsw=0;
        this.wrongAnsw=0;

        this.quizzes=[];
    };

    StatModule.statItems = {
        NUMBER : 1,
        RIGHT  : 2,
        WRONG  : 3
    };

    StatModule.prototype.getStats = function(){
        return {
            right : this.rightAnsw,
            wrong : this.wrongAnsw,
            number: this.numberOfAnswQuest
        }
    };

    StatModule.prototype.getToStatsModule = function(rAnsw,wAnsw,nQuest){
        this.rightAnsw=rAnsw;
        this.wrongAnsw=wAnsw;
        this.numberOfAnswQuest=nQuest;
    };

    StatModule.prototype.resetStats = function(){
        this.numberOfAnswQuest=1;
        this.rightAnsw=0;
        this.wrongAnsw=0;
    };

    StatModule.prototype.increaseParameter = function(flag){
        switch (flag){
            case 1:
                ++this.numberOfAnswQuest;
                break;
            case 2:
                ++this.rightAnsw;
                break;
            case 3:
                ++this.wrongAnsw;
                break;
        }
    };

    StatModule.prototype.updateStats = function(){
        util.placeData('numb',this.numberOfAnswQuest);
        util.placeData('rightAnswerCounter',this.rightAnsw);
        util.placeData('wrongAnswerCounter',this.wrongAnsw);
        util.placeData('numbLast',quiz.data[quiz.numberOfTest].questions.length);
        util.placeData('activeQuest',parseInt(quiz.testModule.activeQuestion)+1);

        for(var i=0;i<this.quizzes.length;i++)
            if(document.getElementById(this.quizzes[i]+'test').innerHTML.indexOf('✔')==-1)
                document.getElementById(this.quizzes[i]+'test').innerHTML+='  ✔';
    };

    StatModule.prototype.markPassedTest=function(n){
        this.quizzes.push(n);
    };


    window.StatModule = StatModule;

}(window));
