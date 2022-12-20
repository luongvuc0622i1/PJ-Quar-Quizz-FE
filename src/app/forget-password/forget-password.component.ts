import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MailService} from "../service/account/mail.service";
import swal from "sweetalert";
import {FormControl, Validators} from "@angular/forms";
import {SignUpForm} from "../model/account/SignUpForm";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  email: string;
  message = "";
  form: any;
  mailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  constructor(private router: Router,
              private mailService: MailService) { }

  ngOnInit(): void {
  }

  backLogin() {
    this.router.navigate(['/account']);
  }

  forgotPassword() {
    console.log(this.email);
    swal("OTP sending... Waiting a minus, Please!")
    this.mailService.forgotPassword(this.email).subscribe(data=>{
      console.log(data)
      if(data == true){
        swal("Sent OTP, Please check your email and enter the OTP code","","success")
        localStorage.setItem("email",this.email);
        this.message = '';
        // this.router.navigate(["/confirm-otp"])
      }else{
        this.message="Wrong email, Please try again!"
      }
    },error =>  {
      swal("Wrong email, Please try again!","","error")
    })
  }

}
