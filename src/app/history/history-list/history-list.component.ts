import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ExamTest} from "../../model/exam-test";
import {ExamService} from "../../service/exam/exam.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
     sum:number;
    examTestDetail:ExamTest[];
    constructor(private examTestService : ExamService,private router: Router) { }

    ngOnInit() {
        console.log(this.examTestDetail);
        this.getAll();
    }
    getAll(){
        this.examTestService.getAll2().subscribe(examTestDetail =>{
            this.examTestDetail = examTestDetail;
        })
    }
    num(TA){
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
