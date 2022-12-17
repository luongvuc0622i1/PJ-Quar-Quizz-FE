import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ExamTestDetail} from "../../history/interface/exam-test-detail";
import {FormGroup} from "@angular/forms";
import {ExamTestDetailService} from "../../history/service/exam-test-detail.service";
import {MatPaginator} from "@angular/material/paginator";
import {ExamQuiz} from "../../examQuiz/interface/exam-quiz";
import {ExamQuizService} from "../../examQuiz/model/exam-quiz.service";

@Component({
  selector: 'app-detail-result',
  templateUrl: './detail-result.component.html',
  styleUrls: ['./detail-result.component.scss']
})
export class DetailResultComponent implements OnInit {
  examQuizDetail:ExamQuiz[];
  examQuizDetail1 :ExamQuiz;
  constructor(private examQuizDetailService : ExamQuizService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.examQuizDetailService.getAll().subscribe(examTestDetail =>{
      this.examQuizDetail = examTestDetail;
    })
  }
}
