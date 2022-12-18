import { Component, OnInit } from '@angular/core';
import {Test} from "../../model/test";
import {TestService} from "../../service/test/test.service";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  tests: Test[] = [];

  constructor(private testService: TestService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.testService.getAll().subscribe(testList => {
      this.tests = testList;
    });
  }
}