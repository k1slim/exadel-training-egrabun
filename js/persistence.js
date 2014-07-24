(function(win){

    var PersModule=function(){
        this.stat={};
        this.actQuest=-1;
        this.actTest=-1;
        this.answArray=[];

        this.parseLocalStorage();
    };

    PersModule.prototype.getToPersModule=function(statObj,actQuest,actTest,answArray){
        this.stat=statObj;
        this.actQuest=actQuest;
        this.actTest=actTest;
        this.answArray=answArray;
    };

    PersModule.prototype.pushToLocalStorage=function(){
        localStorage.setItem('quizzer',JSON.stringify(this));
    };

    PersModule.prototype.checkLocalStorage=function(){
        return localStorage['quizzer'];
    };

    PersModule.prototype.clearLocalStorage=function(){
        localStorage.removeItem('quizzer');
        this.getToPersModule({},-1,-1,[]);
    };

    PersModule.prototype.parseLocalStorage=function(){
        if(this.checkLocalStorage()){
            var temp=JSON.parse(localStorage.getItem('quizzer'));
            this.getToPersModule(temp.stat,temp.actQuest,temp.actTest,temp.answArray);
        }
        else
            this.getToPersModule({},-1,-1,[]);
    };


    window.PersModule = PersModule;

}(window));
