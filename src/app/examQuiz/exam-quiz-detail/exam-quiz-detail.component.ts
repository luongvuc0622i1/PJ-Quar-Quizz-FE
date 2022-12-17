import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ExamQuiz} from "../../model/exam-quiz";
import {ExamService} from "../../service/exam/exam.service";

@Component({
  selector: 'app-exam-quiz-detail',
  templateUrl: './exam-quiz-detail.component.html',
  styleUrls: ['./exam-quiz-detail.component.scss']
})
export class ExamQuizDetailComponent implements OnInit {

    examQuizDetail:ExamQuiz[];
    constructor(private examQuizService : ExamService,private router: Router) { }

    ngOnInit() {
        this.getAll();
    }
    getAll(){
        this.examQuizService.getAll().subscribe(examTestDetail =>{
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
