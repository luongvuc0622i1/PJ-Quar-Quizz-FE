import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ResultService} from "../../../service/result/result.service";
import {User} from "../../../model/user";
import {MatPaginator} from "@angular/material/paginator";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  roles: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private resultService: ResultService) { }

  ngOnInit(): void {
    this.roles = localStorage.getItem('RoleSet_Key');
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
    if(this.roles[7] == 2) {
      this.resultService.getAllUser().subscribe(userList => {
        this.users = userList;
      })
    } else if(this.roles[7] == 1) {
      this.resultService.getAllUserManager().subscribe(userList => {
        this.users = userList;
      })
    }
  }

  lock(id: number) {
    this.resultService.lock(id).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Account has locked',
        showConfirmButton: false,
        timer: 1500
      })
    }, e => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fail! You must be admin',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  open(id: number) {
    this.resultService.open(id).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Account has unlocked',
        showConfirmButton: false,
        timer: 1500
      })
    }, e => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fail! You must be admin',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
}
