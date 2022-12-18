import {Component, OnInit, ViewChild} from '@angular/core';
import {ExamService} from "../../../service/exam/exam.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ExamTest} from "../../../model/exam-test";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {
    examTest: ExamTest;
    id: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

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
        // @ts-ignore
        $("#myTable tr").paginator = this.paginator;
    };

    back() {
        history.back();
    }
}