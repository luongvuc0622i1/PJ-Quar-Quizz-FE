import {Component, OnInit} from '@angular/core';
import {ExamService} from "../../../service/exam/exam.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ExamTest} from "../../../model/exam-test";
import {ExamQuiz} from "../../../model/exam-quiz";
import {Quiz} from "../../../model/quiz";

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {
    examTest: ExamTest;
    id: number;
    boolean: boolean;
    answerUser: string[] = [];
    correct_answer: string[] = [];
    answers: any = [];

    constructor(private examTestService : ExamService,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.id = +paramMap.get('id');
        });
    }

    ngOnInit() {
        this.examTestService.findETById(this.id).subscribe(test => {
            this.examTest = test;
        });
        // setTimeout(() => document.getElementById("clickk").click(), 100);
    }

    ngAfterViewInit() {
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                // @ts-ignore
                var value = $(this).val().toLowerCase();
                // @ts-ignore
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
        this.checkStatus(this.examTest.examQuizzes);
        console.log(this.examTest);
        let c = [];
        for (let i = 0; i < this.examTest.examQuizzes.length; i++) {
            let a = this.examTest.examQuizzes[i].quiz.answer.split(';');
            let b = this.examTest.examQuizzes[i].quiz.correct_answer.split(';');
            for (let i = 0; i < a.length; i++) {
                // @ts-ignore
                c.push({name: a[i], checked: false})
            }
            for (let i = 0; i < b.length; i++) {
                // @ts-ignore
                c[(b[i]-1)].checked = true;
            }
            // @ts-ignore
            this.examTest.examQuizzes[i].quiz.answer = c;
            c = [];
        }
        console.log(this.examTest.examQuizzes);
    };

    checkStatus(examQuizzes: ExamQuiz[]) {
        for (let i = 0; i < examQuizzes.length; i++) {
            const a = examQuizzes[i].answerUser.split(';'); //day la dap an nguoi dung
            const b = examQuizzes[i].quiz.correct_answer.split(';'); //day la correct answer
            let isEqual = true;
            if (a.length == b.length) {
                for (let i=0; i < a.length; i++) {
                    let equal = false;
                    for (let j = 0; j < b.length; j++) {
                        if(a[i] == b[j]) {
                            equal = true;
                            break;
                        }
                    }
                    isEqual &&= equal;
                }
            } else {
                isEqual = false;
            }
            if (isEqual) {
                this.examTest.examQuizzes[i].status = 1;
            } else {
                this.examTest.examQuizzes[i].status = 0;
            }
        }
    }

    // getValue(examQuiz: ExamQuiz) {
    //     // this.answerUser = [];
    //     // for (let i = 0; i < examQuiz.answerUser.split(';').length; i++) {
    //     //     this.answerUser.push(examQuiz.quiz.answer.split(';')[i]);
    //     // }
    //     // this.correct_answer = [];
    //     // for (let i = 0; i < examQuiz.quiz.correct_answer.split(';').length; i++) {
    //     //     this.correct_answer.push(examQuiz.quiz.answer.split(';')[i]);
    //     // }
    //
    //
    //     this.answers = [];
    //     let a = examQuiz.quiz.answer.split(';');
    //     let b = examQuiz.quiz.correct_answer.split(';');
    //     for (let i = 0; i < a.length; i++) {
    //         // @ts-ignore
    //         this.answers.push({name: a[i], checked: false})
    //     }
    //     for (let i = 0; i < b.length; i++) {
    //         // @ts-ignore
    //         this.answers[b[i]-1].checked = true;
    //     }
    //     console.log(this.answers);
    // }

    back() {
        history.back();
    }
}