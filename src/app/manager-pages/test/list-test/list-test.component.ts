import {Component, OnInit, ViewChild} from '@angular/core';
import {TestService} from "../../../service/test/test.service";
import {Test} from "../../../model/test";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {
  tests: Test[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.getAll();
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

  getAll() {
    this.testService.getAll().subscribe(testList => {
      this.tests = testList;
    });
  }
}
