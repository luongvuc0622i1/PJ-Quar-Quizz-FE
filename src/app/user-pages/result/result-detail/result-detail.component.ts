import {Component, OnInit} from '@angular/core';
import {ExamService} from "../../../service/exam/exam.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ExamTest} from "../../../model/exam-test";
import {ExamQuiz} from "../../../model/exam-quiz";

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {
    examTest: ExamTest;
    id: number;
    boolean: boolean;

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

    back() {
        history.back();
    }
}