import { Component, OnInit } from '@angular/core';
import {TestService} from "../../../service/test/test.service";
import {Test} from "../../../model/test";

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {
  tests: Test[] = [];

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.testService.getAll().subscribe(testList => {
      this.tests = testList;
    });
  }
}
