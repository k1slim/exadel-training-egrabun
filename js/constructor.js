(function(win){

    var quizApp=function(){
        this.contenerWithTests=document.getElementsByClassName('listTest')[0];

        this.testModule = new TestModule();

        this.numberOfTest=-1;
        this.data={};
    };

    quizApp.prototype.openTest=function(){
        util.toggle('leftBlock','close');
        util.toggle('Question','open');
        util.placeData('numb',++this.testModule.numb);                            //placed a number of question
        util.placeData('titlePlaceholder',this.data[this.numberOfTest].title);    //placed a title of topic
        this.testModule.placeQuestions(this.data[this.numberOfTest].questions[0]);
        util.placeData('numbLast',this.data[this.numberOfTest].questions.length);

    };

    quizApp.prototype.determineTestNumber=function(e){
        if(e.target.className=='testStr'){
            this.numberOfTest=parseInt(e.target.id);
            this.openTest();
        }
    };

    quizApp.prototype.init=function(){
        this.getData();
        util.placeInToContainer(this.contenerWithTests,this.data.length,"testStr",'test',0);
        util.placeInToContainer(this.testModule.contenerWithQuestion,5,"answ open",'answ',2);

        for(var i=0;i<this.data.length;i++){
            util.placeData(i+'test',this.data[i].title);
        }

        this.contenerWithTests.addEventListener("click",function(evt){quiz.determineTestNumber(evt)});
        this.testModule.contenerWithQuestion.addEventListener("click",function(evt){quiz.testModule.determineAnswNumber(evt)});
        this.testModule.popUpCloseButton.addEventListener("click",function(){quiz.testModule.showAlertWindow('close')});
    };

    quizApp.prototype.getData=function ()
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

    window.QuizzApp = quizApp;

}(window));

window.onload=function(){
    quiz=new QuizzApp();
    quiz.init();
};
