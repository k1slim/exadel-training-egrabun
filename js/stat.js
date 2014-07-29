(function(win,$){

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

    StatModule.prototype.updateStats = function(elem,actQuest){
        $('#numb').html(this.numberOfAnswQuest);
        $('#rightAnswerCounter').html(this.rightAnsw);
        $('#wrongAnswerCounter').html(this.wrongAnsw);
        $('#numbLast').html(elem.questions.length);
        $('#activeQuest').html(parseInt(actQuest)+1);

        _.forEach(this.quizzes,function(num){
            var elm=($('#'+num+'test'));
            (elm.html().indexOf('✔')==-1)? elm.append('  ✔'):false;
        });
    };

    StatModule.prototype.markPassedTest=function(n){
        this.quizzes.push(n);
    };


    window.StatModule = StatModule;

}(window,jQuery));
