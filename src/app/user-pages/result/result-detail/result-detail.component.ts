import { Component, OnInit } from '@angular/core';
import {ExamService} from "../../../service/exam/exam.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ExamTest} from "../../../model/exam-test";

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {
    examTest: ExamTest;
    id: number;

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
}