define("stat", ["jquery", "lodash"], function(e, t){
    var n = function(){
        this.numberOfAnswQuest = 1, this.rightAnsw = 0, this.wrongAnsw = 0, this.quizzes = []
    };
    return n.statItems = {NUMBER: 1, RIGHT: 2, WRONG: 3}, n.prototype.getStats = function(){
        return{right: this.rightAnsw, wrong: this.wrongAnsw, number: this.numberOfAnswQuest}
    }, n.prototype.getToStatsModule = function(e, t, n){
        this.rightAnsw = e, this.wrongAnsw = t, this.numberOfAnswQuest = n
    }, n.prototype.getToStatsModuleQuizzes = function(e){
        this.quizzes = e
    }, n.prototype.resetStats = function(){
        this.numberOfAnswQuest = 1, this.rightAnsw = 0, this.wrongAnsw = 0
    }, n.prototype.increaseParameter = function(e){
        switch(e){
            case 1:
                ++this.numberOfAnswQuest;
                break;
            case 2:
                ++this.rightAnsw;
                break;
            case 3:
                ++this.wrongAnsw
        }
    }, n.prototype.updateStats = function(t, n){
        e("#numb").html(this.numberOfAnswQuest), e("#rightAnswerCounter").html(this.rightAnsw), e("#wrongAnswerCounter").html(this.wrongAnsw), e("#numbLast").html(t.questions.length), e("#activeQuest").html(parseInt(n, 10) + 1)
    }, n.prototype.updatePassedTestMarker = function(){
        t.forEach(this.quizzes, function(t){
            var n = e("#" + t + "test");
            n.html().indexOf("✔") === -1 ? n.append("  ✔") : !1
        })
    }, n.prototype.markPassedTest = function(e){
        this.quizzes.push(e), this.quizzes = t.uniq(this.quizzes), this.updatePassedTestMarker()
    }, n
}), define("util", ["jquery"], function(e){
    var t = {};
    return t.showAlertWindow = function(t, n){
        n === "show" ? (e("#alertWindow").show(), e("#alertWindowBack").show()) : (e("#alertWindow").hide(), e("#alertWindowBack").hide()), e("#textPlaceholder").html(t)
    }, t
}), define("text!../template/templateQuest.hbs", [], function(){
    return'<div id="placeQuestionText">\r\n    {{question}}\r\n</div>\r\n{{#if questionImg}}\r\n    <img id="placeImage" src={{questionImg}} />\r\n{{/if}}\r\n<ul>\r\n    {{#each answers}}\r\n        <li class="answ">\r\n\r\n        </li>\r\n    {{/each}}\r\n</ul>\r\n<div id="skip">\r\n    Пропустить вопрос\r\n</div>'
}), define("test", ["jquery", "lodash", "handlebars", "stat", "util", "text!../template/templateQuest.hbs"], function(e, t, n, r, i, s){
    var o = function(){
        this.contenerWithQuestion = e(".textQuest"), this.popUpCloseButton = e("#closedAlertWindow"), this.backButton = e("#back"), this.statModule = new r, this.activeQuestion = 0, this.answArr = []
    };
    return o.prototype.placeQuestions = function(e){
        var t = n.compile(s);
        this.contenerWithQuestion.html(t(e.questions[this.activeQuestion])), this.changeId(e), this.lockAnswers(this.activeQuestion, this.answArr), this.statModule.updateStats(e, this.activeQuestion)
    }, o.prototype.changeResources = function(e){
        quiz.persModule.getToPersModule(this.statModule.getStats(), this.activeQuestion, e, this.answArr, this.statModule.quizzes), quiz.persModule.pushToLocalStorage(), quiz.router.getToRouter(this.activeQuestion, e), quiz.router.pushToURL()
    }, o.prototype.determineAnswNumber = function(e, t, n){
        e.target.id !== "skip" && (this.statModule.increaseParameter(r.statItems.NUMBER), t.questions[this.activeQuestion].answered = 1, this.answArr.push(this.activeQuestion), parseInt(e.target.id, 10) + 1 === parseInt(t.questions[this.activeQuestion].right, 10) ? this.statModule.increaseParameter(r.statItems.RIGHT) : (this.statModule.increaseParameter(r.statItems.WRONG), i.showAlertWindow(t.questions[this.activeQuestion].question + "<br /><br />Вы ответили:<br />" + t.questions[this.activeQuestion].answers[parseInt(e.target.id, 10)] + "<br /><br />Правильный ответ:<br />" + t.questions[this.activeQuestion].answers[t.questions[this.activeQuestion].right - 1], "show")));
        if(e.target.id === "skip" || parseInt(e.target.id, 10) + 1 === parseInt(t.questions[this.activeQuestion].right, 10))this.activeQuestion = this.logicOfQuestions(t, n, this.activeQuestion), this.changeResources(n), this.statModule.numberOfAnswQuest === t.questions.length + 1 && this.returnToMainPage(t, n)
    }, o.prototype.logicOfQuestions = function(e, t, n){
        var r = !1, i;
        if(this.statModule.numberOfAnswQuest !== e.questions.length + 1){
            i = n === e.questions.length - 1 ? 0 : ++n;
            for(i; i < e.questions.length; i++)if(!e.questions[i].answered){
                r = !0, n = i;
                break
            }
            r === !1 && (n = this.logicOfQuestions(e, t, n))
        }
        return n
    }, o.prototype.returnToMainPage = function(t, n){
        this.statModule.numberOfAnswQuest === t.questions.length + 1 && (this.statModule.rightAnsw >= this.statModule.numberOfAnswQuest - 2 ? (i.showAlertWindow("Молодeц ,правильных ответов - " + this.statModule.rightAnsw + "/" + (this.statModule.numberOfAnswQuest - 1) + ".<br />Тест сдан!", "show"), this.statModule.markPassedTest(n)) : i.showAlertWindow("Не молодeц ,правильных ответов - " + this.statModule.rightAnsw + "/" + (this.statModule.numberOfAnswQuest - 1) + ".<br />Тест не сдан!", "show")), e("#leftBlock").show(), e("#question").hide(), e("#back").hide(), e("#info").hide(), this.activeQuestion = 0, this.statModule.resetStats(), this.statModule.updateStats(t, this.activeQuestion), this.answArr = [];
        for(var r = 0; r < t.questions.length; r++)delete t.questions[r].answered;
        quiz.persModule.getToPersModule({}, -1, -1, [], this.statModule.quizzes), quiz.persModule.pushToLocalStorage(), quiz.router.clearUrl()
    }, o.prototype.defineClosedButtonAction = function(e, t){
        this.statModule.numberOfAnswQuest === e.questions.length + 1 ? this.returnToMainPage(e, t) : (this.statModule.numberOfAnswQuest !== 1 && (this.activeQuestion = this.logicOfQuestions(e, t, this.activeQuestion), this.changeResources(t)), i.showAlertWindow())
    }, o.prototype.changeId = function(n){
        var r = t.range(5);
        r.length = n.questions[this.activeQuestion].answers.length;
        var i = t.shuffle(r);
        for(var s = 0; s < i.length; s++)this.contenerWithQuestion.find("li")[s].setAttribute("id", i[s] + "answ"), e("#" + i[s] + "answ").html(n.questions[this.activeQuestion].answers[i[s]])
    }, o.prototype.getToTestModule = function(e, t){
        this.activeQuestion = e, this.answArr = t
    }, o.prototype.lockAnswers = function(t, n){
        for(var r = 0; r < n.length; r++)if(t === n[r])for(var i = 0; i < 5; i++){
            var s = e("#" + i + "answ");
            s.removeClass("answ"), s.addClass("lock")
        }
    }, o
}), define("persistence", [], function(){
    var e = function(){
        this.stat = {}, this.actQuest = -1, this.actTest = -1, this.answArray = [], this.passedTest = [], this.parseLocalStorage()
    };
    return e.prototype.getToPersModule = function(e, t, n, r, i){
        this.stat = e, this.actQuest = t, this.actTest = n, this.answArray = r, this.passedTest = i
    }, e.prototype.pushToLocalStorage = function(){
        localStorage.setItem("quizzer", JSON.stringify(this))
    }, e.prototype.checkLocalStorage = function(){
        return localStorage.quizzer
    }, e.prototype.parseLocalStorage = function(){
        if(this.checkLocalStorage()){
            var e = JSON.parse(localStorage.getItem("quizzer"));
            this.getToPersModule(e.stat, e.actQuest, e.actTest, e.answArray, e.passedTest)
        } else this.getToPersModule({}, -1, -1, [], [])
    }, e
}), define("routing", [], function(){
    var e = function(){
        this.actQuest = -1, this.actTest = -1, this.parseUrl()
    };
    return e.prototype.getToRouter = function(e, t){
        this.actQuest = e, this.actTest = t
    }, e.prototype.pushToURL = function(){
        var e = this.actTest + 1, t = this.actQuest + 1;
        window.location.hash = "#test/" + e + "/" + t + "/"
    }, e.prototype.clearUrl = function(){
        window.location.hash = "", this.getToRouter(-1, -1)
    }, e.prototype.parseUrl = function(){
        this.checkUrl() ? this.getToRouter(this.checkUrl()[2] - 1, this.checkUrl()[1] - 1) : this.getToRouter(-1, -1)
    }, e.prototype.checkUrl = function(){
        var e = /#test\/([0-9]{1})\/([0-9]{1,2})\/?/;
        return window.location.hash.match(e)
    }, e.prototype.urlValidation = function(e){
        if(this.checkUrl()[1] > e.length || parseInt(this.checkUrl()[1], 10) === 0)this.actTest = 0;
        if(this.checkUrl()[2] > e[this.actTest].questions.length || parseInt(this.checkUrl()[2], 10) === 0)this.actQuest = 0
    }, e
}), define("text!../template/templateListTest.hbs", [], function(){
    return'<ul>\r\n    {{#each test}}\r\n        <li id={{@index}}test class="testStr">\r\n            {{title}}\r\n        </li>\r\n    {{/each}}\r\n</ul>'
}), define("constructor", ["jquery", "lodash", "handlebars", "test", "persistence", "routing", "text!../template/templateListTest.hbs"], function(e, t, n, r, i, s, o){
    var u = function(){
        this.contenerWithTests = e(".listTest"), this.clearButton = e("#clear"), this.testModule = null, this.persModule = null, this.router = null, this.numberOfTest = -1, this.data = {}
    };
    return u.prototype.openTest = function(){
        e("#leftBlock").hide(), e("#question").show(), e("#back").show(), e("#info").show(), e("#titlePlaceholder").html(this.data[this.numberOfTest].title), this.testModule.changeResources(this.numberOfTest)
    }, u.prototype.determineTestNumber = function(e){
        this.numberOfTest = parseInt(e.target.id, 10), this.openTest()
    }, u.prototype.init = function(){
        var e = this;
        this.testModule = new r, this.persModule = new i, this.router = new s, this.getData("js/json/data.json", function(t){
            e.data = t
        })
    }, u.prototype.startApp = function(){
        var e = this, t = n.compile(o);
        this.contenerWithTests.html(t({test: this.data})), window.addEventListener("hashchange", function(){
            e.router.parseUrl(), e.pushDataToApp()
        }), this.contenerWithTests.on("click", ".testStr", function(t){
            e.determineTestNumber(t)
        }), this.testModule.contenerWithQuestion.on("click", ".answ, #skip", function(t){
            e.testModule.determineAnswNumber(t, e.data[e.numberOfTest], e.numberOfTest)
        }), this.testModule.popUpCloseButton.on("click", function(){
            e.testModule.defineClosedButtonAction(e.data[e.numberOfTest], e.numberOfTest)
        }), this.testModule.backButton.on("click", function(){
            e.testModule.returnToMainPage(e.data[e.numberOfTest], e.numberOfTest)
        }), this.clearButton.on("click", function(){
            localStorage.removeItem("quizzer")
        }), this.pushDataToApp(), (this.persModule.actTest !== -1 || this.router.actQuest !== -1) && this.openTest()
    }, u.prototype.getData = function(t, n){
        var r = this;
        e.getJSON(t, function(e){
            n(e), r.startApp()
        })
    }, u.prototype.pushDataToApp = function(){
        this.testModule.statModule.getToStatsModuleQuizzes(this.persModule.passedTest), this.testModule.statModule.updatePassedTestMarker();
        if(this.persModule.actTest !== -1){
            this.getToConst(this.persModule.actTest), this.testModule.statModule.getToStatsModule(this.persModule.stat.right, this.persModule.stat.wrong, this.persModule.stat.number), this.testModule.getToTestModule(this.persModule.actQuest, this.persModule.answArray);
            for(var t = 0; t < this.testModule.answArr.length; t++)this.data[this.numberOfTest].questions[this.testModule.answArr[t]].answered = 1
        }
        this.router.actQuest !== -1 && (this.router.urlValidation(this.data), this.getToConst(this.router.actTest), this.testModule.activeQuestion = this.router.actQuest), this.persModule.actTest !== -1 && this.router.actTest !== -1 && this.router.actTest !== this.persModule.actTest && (this.testModule.statModule.resetStats(), this.testModule.answArr = [], this.persModule.getToPersModule({}, -1, -1, [], this.testModule.statModule.quizzes), this.persModule.pushToLocalStorage());
        if(this.persModule.actTest !== -1 || this.router.actQuest !== -1)e("#titlePlaceholder").html(this.data[this.numberOfTest].title), this.testModule.placeQuestions(this.data[this.numberOfTest])
    }, u.prototype.getToConst = function(e){
        this.numberOfTest = e
    }, new u
});
var quiz;
require.config({paths: {jquery: "../../baower_components/jquery/dist/jquery.min", handlebars: "../../bower_components/handlebars/handlebars", lodash: "../../bower_components/lodash/dist/lodash", text: "../../bower_components/requirejs-text/text", constructor: "constructor", test: "test", stat: "stat", persistence: "persistence", routing: "routing", util: "util"}, shim: {handlebars: {exports: "Handlebars"}}}), require(["constructor"], function(e){
    quiz = e, quiz.init()
}), define("init", function(){
});