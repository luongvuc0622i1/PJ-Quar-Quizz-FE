import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ResultService} from "../../../service/result/result.service";
import {User} from "../../../model/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  roles: any;

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
    Swal.fire({
      title: 'This account will be lock',
      text: "Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultService.lock(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Account has locked',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload()
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
    })
  }

  open(id: number) {
    Swal.fire({
      title: 'This account will be open',
      text: "Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultService.open(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Account has unlocked',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload()
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
    })
  }

  managerToUser(user: User) {
    Swal.fire({
      title: user.name + ' will change to user role',
      text: "Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultService.changeToUser(user).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Account has been user role',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload()
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
    })
  }

  userToManager(user: User) {
    Swal.fire({
      title: user.name + ' will change to manager role',
      text: "Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultService.changeToManager(user).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Account has been manager role',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload()
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
    })
  }
}