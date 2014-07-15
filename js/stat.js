(function(win){

    var StatModule=function(){
        this.numberOfAnswQuest=0;
        this.rightAnsw=0;
        this.wrongAnsw=0;
    };

    StatModule.prototype.getStats = function(){
        return {
            right : this.rightAnsw,
            wrong : this.wrongAnsw,
            number: this.numberOfAnswQuest
        }
    };

    StatModule.prototype.resetStats = function(){
        this.numberOfAnswQuest=0;
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
        this.updateStats();

    };

    StatModule.prototype.updateStats = function(){
        util.placeData('numb',this.numberOfAnswQuest);
        util.placeData('rightAnswerCounter',this.rightAnsw);
        util.placeData('wrongAnswerCounter',this.wrongAnsw);
        util.placeData('numbLast',quiz.data[quiz.numberOfTest].questions.length);
    };

    window.StatModule = StatModule;

}(window));
