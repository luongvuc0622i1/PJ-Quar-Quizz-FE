import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../../service/quiz/quiz.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Quiz} from "../../../model/quiz";


@Component({
    selector: 'app-list-quiz',
    templateUrl: './list-quiz.component.html',
    styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {
    quizzes: Quiz[] = [];
    answers: any = [];

    constructor(private quizService: QuizService,
                private router: Router) {}

    ngOnInit(): void {
        this.quizService.getAll().subscribe(quizList => {
            this.quizzes = quizList;
        });
        setTimeout(() => document.getElementById("clickk").click(), 100);
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
    };

    getValue(quiz: Quiz) {
        this.answers = [];
        let a = quiz.answer.split(';');
        let b = quiz.correct_answer.split(';');
        for (let i = 0; i < a.length; i++) {
            // @ts-ignore
            this.answers.push({name: a[i], checked: false})
        }
        for (let i = 0; i < b.length; i++) {
            // @ts-ignore
            this.answers[b[i]-1].checked = true;
        }
    }

    deleteQuiz(id) {
        Swal.fire({
            title: 'Delete quiz',
            text: "Are you sure to delete this quiz?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                this.quizService.delete(id).subscribe(() => {
                    this.router.navigate(['/manager/quizzes']);
                    Swal.fire({
                        icon: 'success',
                        title: 'Quiz deleted!',
                        showConfirmButton: true
                    }).
                    then(() => {
                        location.reload()
                    })
                }, e => {
                    console.log(e);
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete fail!',
                        text: 'If the quiz is already on a test, it can not be deleted.'
                    })
                });
            }
        })
    }
}