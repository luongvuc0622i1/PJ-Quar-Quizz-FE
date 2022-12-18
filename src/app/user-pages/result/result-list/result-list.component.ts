import { Component, OnInit } from '@angular/core';
import {ExamTest} from "../../../model/exam-test";
import {ExamService} from "../../../service/exam/exam.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
    examTests: ExamTest[];
    examTestFilter: ExamTest[] = [];
    idP: number = Number(localStorage.getItem('ID_KEY'));
    id: number;

    constructor(private examTestService : ExamService,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.id = +paramMap.get('id');
        });
    }

    ngOnInit() {
        this.getAll();
    }

    getAll(){
        this.examTestService.getAllET().subscribe(examTest =>{
            this.examTests = examTest;
        })
    }

    ngAfterViewChecked() {
        this.examTestFilter = [];
        for (let i = 0; i < this.examTests.length; i++) {
            // @ts-ignore
            if (this.examTests[i].appUser.id == this.id) {
                this.examTestFilter.push(this.examTests[i]);
            }
        }
    }
}
