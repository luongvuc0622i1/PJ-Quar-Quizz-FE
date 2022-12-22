import { Component, OnInit } from '@angular/core';
import {TestService} from "../../../service/test/test.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Test} from "../../../model/test";

@Component({
  selector: 'app-detail-test',
  templateUrl: './detail-test.component.html',
  styleUrls: ['./detail-test.component.scss']
})
export class DetailTestComponent implements OnInit {
  test: Test;
  id: number;

  constructor(private testService: TestService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.testService.findById(this.id).subscribe(test => {
      this.test = test;
    });
  }

  ngAfterViewInit() {
    let c = [];
    for (let i = 0; i < this.test.quizzes.length; i++) {
      let a = this.test.quizzes[i].answer.split(';');
      let b = this.test.quizzes[i].correct_answer.split(';');
      for (let i = 0; i < a.length; i++) {
        // @ts-ignore
        c.push({name: a[i], checked: false})
      }
      for (let i = 0; i < b.length; i++) {
        // @ts-ignore
        c[(b[i] - 1)].checked = true;
      }
      // @ts-ignore
      this.test.quizzes[i].answer = c;
      c = [];
    }
  }
}
