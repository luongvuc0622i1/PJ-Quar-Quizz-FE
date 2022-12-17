import { Component, OnInit } from '@angular/core';
import {ExamQuizService} from "../model/exam-quiz.service";
import {ExamQuiz} from "../interface/exam-quiz";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-exam-quiz-detail',
  templateUrl: './exam-quiz-detail.component.html',
  styleUrls: ['./exam-quiz-detail.component.scss']
})
export class ExamQuizDetailComponent implements OnInit {

    examQuizDetail:ExamQuiz[];
    examQuizDetail1 :ExamQuiz;
    constructor(private examQuizDetailService : ExamQuizService,private router: Router) { }

    ngOnInit() {
        this.getAll();
    }
    getAll(){
        this.examQuizDetailService.getAll().subscribe(examTestDetail =>{
            this.examQuizDetail = examTestDetail;
        })
    }
    logOut() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Log Out',
                    'Go to Home Page!',
                    'success'
                )
                localStorage.clear();
                this.router.navigate(['home']).then(()=>{
                    location.reload()
                })
            }
        })


    }

}
