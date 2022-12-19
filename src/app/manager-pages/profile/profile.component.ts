import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchValidator} from "../../service/form-validators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  password: any;
  id: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("ID_KEY"));
    this.getUserById(this.id);
  }

  changePasswordForm: FormGroup = new FormGroup({
    curPass: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
    newPass: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
    rePass: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'), matchValidator('newPass')]),
  })

  get curPass(){
    return this.changePasswordForm.get('curPass')
  }
  get newPass(){
    return this.changePasswordForm.get('newPass')
  }
  get rePass(){
    return this.changePasswordForm.get('rePass')
  }

  submit(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Update'
    }).then((result) => {
      if (result.isConfirmed) {
        const test= this.changePasswordForm.value;
        const test1 = {
          "oldPassword": test.curPass,
          "newPassword": test.newPass
        };
        this.userService.update(this.id, test1).subscribe(() =>{
          Swal.fire(
              'Done!',
              ' ',
              'success'
          )
          this.changePasswordForm.reset();
        }, error => {
          console.log('Current Password is fault!');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Current password wrong!',
            footer: ' '
          })
        });
      }
    })
  }

  getUserById(id: number) {
    this.userService.findById(id).subscribe(user => {
      this.user = user;
      this.password = user.password;
    });
  }

  myFunction1() {
    var x = document.getElementById("inputCur");
    this.change(x);
  }

  myFunction2() {
    var x = document.getElementById("inputNew");
    this.change(x);
  }

  myFunction3() {
    var x = document.getElementById("inputRe");
    this.change(x);
  }

  change(x) {
    // @ts-ignore
    if (x.type === "password") {
      // @ts-ignore
      x.type = "text";
    } else {
      // @ts-ignore
      x.type = "password";
    }
  }
}