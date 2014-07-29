(function(win){

    var Router=function(){
        this.actQuest=-1;
        this.actTest=-1;

        this.parseUrl();
    };

    Router.prototype.getToRouter=function(actQuest,actTest){
        this.actQuest=actQuest;
        this.actTest=actTest;
    };

    Router.prototype.pushToURL=function(){
        var test=this.actTest+1;
        var quest=this.actQuest+1;
        window.location.hash='#test/'+test+'/'+quest+'/';
    };

    Router.prototype.clearUrl=function(){
        window.location.hash='';
        this.getToRouter(-1,-1);
    };

    Router.prototype.parseUrl=function(){
        if(this.checkUrl()){
            this.getToRouter(this.checkUrl()[2]-1,this.checkUrl()[1]-1);
        }
        else{
            this.getToRouter(-1,-1);
        }
    };

    Router.prototype.checkUrl=function(){
        var patternHash=/#test\/([0-9]{1})\/([0-9]{1,2})\/?/;
        var found = window.location.hash.match(patternHash);
        return found;
    };

    Router.prototype.urlValidation=function(data){
        if(this.checkUrl()[1]>data.length || this.checkUrl()[1]==0)
            this.actTest=0;
        if(this.checkUrl()[2]>data[this.actTest].questions.length || this.checkUrl()[2]==0)
            this.actQuest=0;
    };


    window.Router = Router;

}(window));
