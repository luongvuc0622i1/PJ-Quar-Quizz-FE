import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchValidator} from "../service/form-validators";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : any;
  password : any;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.getAll();
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
      confirmButtonText: 'Yes, Change now!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
            'Done!',
            ' ',
            'success'
        )
        const test= this.changePasswordForm.value;
        console.log(test);
        const test1 = {
          "oldPassword": test.curPass,
          "newPassword": test.newPass
        };
        console.log(test1);
        this.userService.update(test1).subscribe(() =>{
          this.changePasswordForm.reset();
          console.log('Update done!');
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

  getAll() {
    this.userService.findById().subscribe(user => {
      this.user = user;
      console.log(user);
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

  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
            'Log Out',
            'Go to Home Page!',
            'success'
        )
        localStorage.clear();
        this.router.navigate(['home']).then(()=>{
          location.reload()
        })
      }
    })


  }
}
