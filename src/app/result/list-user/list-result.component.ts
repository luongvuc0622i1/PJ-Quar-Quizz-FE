import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ResultService} from "../../service/result/result.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.scss']
})
export class ListResultComponent implements OnInit, AfterViewInit {

  users: User[] = [];

  constructor(private resultService: ResultService,
              private router: Router) { }

  ngOnInit(): void {
      this.getAll();
  }
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

  getAll() {
    this.resultService.getAll().subscribe(userList => {
      this.users = userList;
    })
  }

}
