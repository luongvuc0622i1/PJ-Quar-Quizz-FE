import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ExamTest} from "../../../model/exam-test";
import {ExamService} from "../../../service/exam/exam.service";

@Component({
  selector: 'app-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.scss']
})
export class ListResultComponent implements OnInit, AfterViewInit {

  // sum:number;
  examTestDetail:ExamTest[];
  constructor(private examTestService : ExamService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
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

  ngOnInit() {
    console.log(this.examTestDetail);
    this.getAll();
  }
  getAll(){
    this.examTestService.getAll().subscribe(examTestDetail =>{
      this.examTestDetail = examTestDetail;
    })
  }
  // num(){
  //   let countQuizzes:number;
  //   let count: any = this.examTestDetail1.numOfTA;
  //   let checkQuizzes:any= this.examTestDetail1.examQuizzes.test.quizzes;
  //   for(let i:number; checkQuizzes.length;i++){
  //     countQuizzes +=i;
  //   }
  //   this.sum = count/countQuizzes*100;
  //   return this.sum;
  // }

  num(TA){
  }

}
