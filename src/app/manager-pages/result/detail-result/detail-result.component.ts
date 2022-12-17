import {Component, OnInit} from '@angular/core';
import {ExamQuiz} from "../../../model/exam-quiz";
import {ExamService} from "../../../service/exam/exam.service";

@Component({
  selector: 'app-detail-result',
  templateUrl: './detail-result.component.html',
  styleUrls: ['./detail-result.component.scss']
})
export class DetailResultComponent implements OnInit {
  examQuizDetail:ExamQuiz[];
  constructor(private examQuizService : ExamService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.examQuizService.getAll().subscribe(examTestDetail =>{
      this.examQuizDetail = examTestDetail;
    })
  }
}
