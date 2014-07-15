(function(win){

    var QuizApp=function(){
        this.contenerWithTests=document.getElementsByClassName('listTest')[0];

        this.testModule = new TestModule();

        this.numberOfTest=-1;
        this.data={};
    };

    QuizApp.prototype.openTest=function(){
        util.toggle('leftBlock','close');
        util.toggle('question','open');
        util.toggle('back','open');
        util.placeData('titlePlaceholder',this.data[this.numberOfTest].title);
        this.testModule.placeQuestions(this.data[this.numberOfTest].questions[0]);
        this.testModule.statModule.increaseParameter(1);
    };

    QuizApp.prototype.determineTestNumber=function(e){
        if(e.target.className=='testStr'){
            this.numberOfTest=parseInt(e.target.id);
            this.openTest();
        }
    };

    QuizApp.prototype.init=function(){
        this.getData();
        util.placeInToContainer(this.contenerWithTests,this.data.length,"testStr",'test',0);
        util.placeInToContainer(this.testModule.contenerWithQuestion,5,"answ open",'answ',2);

        for(var i=0;i<this.data.length;i++){
            util.placeData(i+'test',this.data[i].title);
        }

        this.contenerWithTests.addEventListener("click",function(evt){quiz.determineTestNumber(evt)});
        this.testModule.contenerWithQuestion.addEventListener("click",function(evt){quiz.testModule.determineAnswNumber(evt)});
        this.testModule.popUpCloseButton.addEventListener("click",function(){util.showAlertWindow('close')});
        this.testModule.backButton.addEventListener("click",function(){quiz.testModule.returnToMainPage()});
    };

    QuizApp.prototype.getData=function ()
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "js/json/data.json",false);
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState === 4 && xhr.status === 200)
            {
                var type = xhr.getResponseHeader("Content-Type");
                if(type.indexOf("xml") !== -1)
                {
                    quiz.data=xhr.responseXML;
                }
                else if(type === "application/json")
                {
                    quiz.data=JSON.parse(xhr.responseText);
                }
                else
                {
                    quiz.data=xhr.responseText;
                }
            }
        };
        xhr.send();
    };

    window.QuizzApp = QuizApp;

}(window));

window.onload=function(){
    quiz=new QuizzApp();
    quiz.init();
};
