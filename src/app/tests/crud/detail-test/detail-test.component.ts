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
  panelOpenState = false;

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
}
