import { Component, OnInit } from '@angular/core';
import {ExamTest} from "../../../model/exam-test";
import {ExamService} from "../../../service/exam/exam.service";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
     sum:number;
    examTestDetail:ExamTest[];
    constructor(private examTestService : ExamService) { }

    ngOnInit() {
        console.log(this.examTestDetail);
        this.getAll();
    }
    getAll(){
        this.examTestService.getAllET().subscribe(examTestDetail =>{
            this.examTestDetail = examTestDetail;
        })
    }
}
