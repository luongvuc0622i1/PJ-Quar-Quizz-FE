import {Component, OnInit, ViewChild} from '@angular/core';
import {ExamTest} from "../../../model/exam-test";
import {ExamService} from "../../../service/exam/exam.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
    examTests: ExamTest[];
    examTestFilter: ExamTest[] = [];
    roles: any;
    id: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private examTestService : ExamService,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.id = +paramMap.get('id');
        });
    }

    ngOnInit() {
        this.getAll();
        this.roles = localStorage.getItem('RoleSet_Key');
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

    back() {
        history.back();
    }
}
