define(function(require){

    describe('active test', function(){

        var date = {
            "title": "Зачет по теме №8 ",
            "description": "Ответственность. Безопасность. Медицина",
            "questions": [
                {
                    "question": "1Вы остановились на подъеме в ожидании разрешающего сигнала светофора. Каким из перечисленных способов лучше всего удерживать автомобиль в такой ситуации?",
                    "questionImg": null,
                    "answers": [
                        "Стояночным тормозом",
                        "За счет пробуксовки сцепления при включенной 1 передаче",
                        "Неработающим двигателем и включенной низшей передачей",
                        "Рабочим тормозом"
                    ],
                    "right": "1"
                },
                {
                    "question": "2Какой прием вождения автопоезда из перечисленных наиболее эффективно гасит «виляние» прицепа?",
                    "questionImg": null,
                    "answers": [
                        "Кратковременное торможение",
                        "Переход на нейтральную передачу",
                        "Поворот рулевого колеса",
                        "Кратковременный разгон"
                    ],
                    "right": "4"
                },
                {
                    "question": "3Как влияет на устойчивость заднеприводного автомобиля торможение двигателем на скользкой дороге?",
                    "questionImg": null,
                    "answers": [
                        "Понижает устойчивость",
                        "Не влияет на устойчивость",
                        "Повышает устойчивость"
                    ],
                    "right": "3"
                }
            ]
        };

        var clearData=function(){
            for(var i = 0; i < date.questions.length; i++)
                delete date.questions[i].answered;
        };

        var specIt=function(text1,v1,text2,v2,text3,v3){
            it(text1, function(){
                expect(require('test').logicOfQuestions(date, 0)).toBe(v1);
            });
            it(text2, function(){
                expect(require('test').logicOfQuestions(date, 1)).toBe(v2);
            });
            it(text3, function(){
                expect(require('test').logicOfQuestions(date, 2)).toBe(v3);
            });
        };


        describe('wrong value', function(){
            it('string value', function(){
                expect(require('test').logicOfQuestions(date, '1')).toBe(2);
            });
            it('#-1 =0', function(){
                expect(require('test').logicOfQuestions(date, -1)).toBe(0);
            });
            it('array value', function(){
                expect(require('test').logicOfQuestions(date, [1])).toBe(2);
            });
            it('greater value', function(){
                expect(require('test').logicOfQuestions(date, 17)).toBe(0);
            });
            it('negative value', function(){
                expect(require('test').logicOfQuestions(date, -17)).toBe(0);
            });
        });

        describe('numberOfAnswQuest=1', function(){
            beforeEach(function(){
                require('stat').numberOfAnswQuest = 2;
            });

            describe('no answered', function(){
                specIt('#0 =1',1,'#1 =2',2,'#2 =0',0);
            });

            describe('#0 answered', function(){
                beforeEach(function(){
                    clearData();
                    date.questions[0].answered = 1;
                });
                specIt('#0 =1',1,'#1 =2',2,'#2 =1',1);
            });

            describe('#1 answered', function(){
                beforeEach(function(){
                    clearData();
                    date.questions[1].answered = 1;
                });
                specIt('#0 =2',2,'#1 =2',2,'#2 =0',0);
            });

            describe('#2 answered', function(){
                beforeEach(function(){
                    clearData();
                    date.questions[2].answered = 1;
                });
                specIt('#0 =1',1,'#1 =0',0,'#2 =0',0);
            });
        });


        describe('numberOfAnswQuest=2', function(){
            beforeEach(function(){
                require('stat').numberOfAnswQuest = 3;
            });

            describe('#0,1 answered', function(){

                beforeEach(function(){
                    clearData();
                    date.questions[0].answered = 1;
                    date.questions[1].answered = 1;
                });
                specIt('#0 =2',2,'#1 =2',2,'#2 =2',2);
            });

            describe('#1,2 answered', function(){

                beforeEach(function(){
                    clearData();
                    date.questions[1].answered = 1;
                    date.questions[2].answered = 1;
                });
                specIt('#0 =0',0,'#1 =0',0,'#2 =0',0);
            });

            describe('#2,0 answered', function(){

                beforeEach(function(){
                    clearData();
                    date.questions[2].answered = 1;
                    date.questions[0].answered = 1;
                });
                specIt('#0 =1',1,'#1 =1',1,'#2 =1',1);
            });
        });


        describe('numberOfAnswQuest=3', function(){
            beforeEach(function(){
                require('stat').numberOfAnswQuest = 4;
            });

            describe('#0,1,2 answered', function(){

                beforeEach(function(){
                    clearData();
                    date.questions[0].answered = 1;
                    date.questions[1].answered = 1;
                    date.questions[2].answered = 1;
                });
                specIt('#0 =0',0,'#1 =1',1,'#2 =2',2);
            });
        });

    });
});
