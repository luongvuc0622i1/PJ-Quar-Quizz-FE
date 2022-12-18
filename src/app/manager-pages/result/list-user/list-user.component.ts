import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ResultService} from "../../../service/result/result.service";
import {User} from "../../../model/user";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private resultService: ResultService) { }

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
    this.resultService.getAll().subscribe(userList => {
      this.users = userList;
    })
  }
}
