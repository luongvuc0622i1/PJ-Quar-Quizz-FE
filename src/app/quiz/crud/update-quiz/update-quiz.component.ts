import {Component, OnInit} from '@angular/core';
import {Level} from "../../model/level";
import {TypeQuizzes} from "../../model/typequizzes";
import {Categories} from "../../model/categories";
import {QuizService} from "../../service/quiz.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Quiz} from "../../model/quiz";

declare var $: any;

@Component({
    selector: 'app-update-quiz',
    templateUrl: './update-quiz.component.html',
    styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
    quizForm: FormGroup;
    id: number;
    levels: Level[] = [];
    typeQuizzes: TypeQuizzes[] = [];
    categories: Categories[] = [];
    quiz: Quiz;
    option1: any;
    option2: any;
    option3: any;
    option4: any;

    constructor(private quizService: QuizService,
                private activatedRoute: ActivatedRoute) {
        this.quizForm = new FormGroup(    {
            name: new FormControl(''),
            answer1: new FormControl(''),
            answer2: new FormControl(''),
            answer3: new FormControl(''),
            answer4: new FormControl(''),
            correct_answer: new FormControl(''),
            level: new FormControl(''),
            typeQuiz: new FormControl(''),
            category: new FormControl('')
        });
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.id = +paramMap.get('id');
            this.getQuiz(this.id);
        });
    }

    private getQuiz(id: number) {
        return this.quizService.findById(id).subscribe(quiz => {
            console.log(quiz)
            let quiz2 = this.changeToForm(quiz);
            console.log(quiz2)
            this.quizForm = new FormGroup({
                name: new FormControl(quiz2.name, [Validators.required]),
                answer1: new FormControl(quiz2.answer1, [Validators.required]),
                answer2: new FormControl(quiz2.answer2, [Validators.required]),
                answer3: new FormControl(quiz2.answer3, [Validators.required]),
                answer4: new FormControl(quiz2.answer4, [Validators.required]),
                correct_answer: new FormControl(quiz2.correct_answer, [Validators.required]),
                level: new FormControl(quiz2.level, [Validators.required]),
                typeQuiz: new FormControl(quiz2.typeQuiz, [Validators.required]),
                category: new FormControl(quiz2.category)
            });
        });
    }


    ngOnInit(): void {
        this.getAll();

    }

    get name() {
        return this.quizForm.get('name')
    }

    get answer1() {
        return this.quizForm.get('answer1')
    }

    get answer2() {
        return this.quizForm.get('answer2')
    }

    get answer3() {
        return this.quizForm.get('answer3')
    }

    get answer4() {
        return this.quizForm.get('answer4')
    }


    get correctAnswer() {
        return this.quizForm.get('correct_answer')
    }

    get level() {
        return this.quizForm.get('level')
    }

    get typeQuiz() {
        return this.quizForm.get('typeQuiz')
    }

    get category() {
        return this.quizForm.get('category')
    }

    updateQuiz(id: number) {
        const quiz = this.quizForm.value;
        console.log(quiz);
        const quiz1 = this.changeToQuiz(quiz);
        console.log(quiz1);
        this.quizService.update(id, quiz1).subscribe(() => {
            this.quizForm.reset();
            this.showNotification('top', 'center')
        }, error => {
            console.log(error)
        });
    }

    getAll() {
        this.quizService.getLevels().subscribe(levelList => {
            this.levels = levelList;
        });
        this.quizService.getTypeQuizzes().subscribe(typeQuizzesList => {
            this.typeQuizzes = typeQuizzesList;
        });
        this.quizService.getCategories().subscribe(categoryList => {
            this.categories = categoryList;
        });
    }

    changeToQuiz(quiz: any) {
        let id;
        let arLevel;
        let arCategory = [];
        let quiz1;
        let correct_answer1: String = "";
        let arTypeQuizzes;
        let answer = quiz.answer1 + ";" + quiz.answer2 + ";" + quiz.answer3 + ";" + quiz.answer4;
        let name: String;

        for (let i = 0; i < quiz.category.length; i++) {
            id = quiz.category[i];
            arCategory.push({id});
        }
        correct_answer1 += quiz.correct_answer.join(";");

        id = quiz.level;
        arLevel = {id};

        id = quiz.typeQuiz;
        arTypeQuizzes = {id};

        quiz1 = {
            answer: answer,
            correct_answer: correct_answer1,
            name: quiz.name,
            typeQuizzes: arTypeQuizzes,
            level: arLevel,
            categories: arCategory
        }
        return quiz1;
    }

    changeToForm(quiz: Quiz) {
        let quiz2;
        let answer1;
        let answer2;
        let answer3;
        let answer4;
        let arCategory2 = [];
        let arCorrectAnswer = quiz.correct_answer.split(";")
        let arAnswer = quiz.answer.split(";");
        for (let i = 0; i < arAnswer.length; i++) {
            answer1 = arAnswer[0];
            answer2 = arAnswer[1];
            answer3 = arAnswer[2];
            answer4 = arAnswer[3];
        }
        for (let i = 0; i < quiz.categories.length; i++) {
            arCategory2.push(quiz.categories[i].id.toString());
        }

        quiz2 = {
            name: quiz.name,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            correct_answer: arCorrectAnswer,
            level: quiz.level.id,
            typeQuiz: quiz.typeQuizzes.id,
            category: arCategory2
        }
        return quiz2;
    }

    showNotification(from, align) {
        // const type = ['','info','success','warning','danger'];
        //
        // var color = Math.floor((Math.random() * 4) + 1);
        $.notify({
            icon: "pe-7s-check",
            message: "Update quiz successfully!"
        }, {
            type: 'success',
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
    }

}
