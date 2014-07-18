(function(win){

    var PersModule=function(){
        this.stat={};
        this.actQuest=0;
        this.actTest=0;
        this.answArray=[];
    };

    PersModule.prototype.get=function(statObj,actQuest,actTest,answArray){
        this.stat=statObj;
        this.actQuest=actQuest;
        this.actTest=actTest;
        this.answArray=answArray;

        this.pushToLocalStorage();
    };

    PersModule.prototype.pushToLocalStorage=function(){
        localStorage.setItem('quizzer',JSON.stringify(this));
    };

    PersModule.prototype.checkLocalStorage=function(){
        return localStorage['quizzer'];
    };

    PersModule.prototype.clearStorage=function(){
        localStorage.removeItem('quizzer');
    };

    PersModule.prototype.getFromLocalStorage=function(){
        var temp=JSON.parse(localStorage.getItem('quizzer'));

        this.stat=temp.stat;
        this.actQuest=temp.actQuest;
        this.actTest=temp.actTest;
        this.answArray=temp.answArray;
    };


    window.PersModule = PersModule;

}(window));
