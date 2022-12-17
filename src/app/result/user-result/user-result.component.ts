import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ExamTestDetail} from "../../history/interface/exam-test-detail";
import {ExamTestDetailService} from "../../history/service/exam-test-detail.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss']
})
export class UserResultComponent implements OnInit, AfterViewInit {

  // sum:number;
  examTestDetail:ExamTestDetail[];
  constructor(private examTestDetailService : ExamTestDetailService) { }

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
    this.examTestDetailService.getAll().subscribe(examTestDetail =>{
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
