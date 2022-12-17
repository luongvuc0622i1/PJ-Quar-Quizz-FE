import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../model/quiz";
import {QuizService} from "../../service/quiz.service";
import {Level} from "../../../quiz/model/level";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeQuizzes} from "../../model/typequizzes";
import {Categories} from "../../model/categories";

declare var $: any;

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
    levels: Level[] = [];
    typeQuizzes: TypeQuizzes[] = [];
    categories: Categories[] = [];


    option1: any;
    option2: any;
    option3: any;
    option4: any;

    constructor(private quizService: QuizService) {
    }

    ngOnInit(): void {
        this.getAll();
    }

    quizForm: FormGroup = new FormGroup({
        name: new FormControl("", [Validators.required]),
        answer1: new FormControl("", [Validators.required]),
        answer2: new FormControl("", [Validators.required]),
        answer3: new FormControl("", [Validators.required]),
        answer4: new FormControl("", [Validators.required]),
        correct_answer: new FormControl("", [Validators.required]),
        level: new FormControl("", [Validators.required]),
        typeQuiz: new FormControl("", [Validators.required]),
        category: new FormControl("")
    })

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


    submit() {
        const quiz = this.quizForm.value;
        console.log(quiz);
        const quiz1 = this.change(quiz);
        console.log(quiz1);
        this.quizService.save(quiz1).subscribe(() => {
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

    change(quiz: any) {
        let id;
        let arLevel;
        let arCategory = [];
        let quiz1;
        let correct_answer1: String = "";
        let arTypeQuizzes;
        let answer = quiz.answer1 + ";" + quiz.answer2 + ";" + quiz.answer3 + ";" + quiz.answer4;

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


    showNotification(from, align) {
        // const type = ['','info','success','warning','danger'];
        //
        // var color = Math.floor((Math.random() * 4) + 1);
        $.notify({
            icon: "pe-7s-check",
            message: "Create new quiz successfully!"
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
