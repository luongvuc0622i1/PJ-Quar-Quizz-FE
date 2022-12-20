import { Component, OnInit } from '@angular/core';
import {MailService} from "../service/account/mail.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import swal from "sweetalert";
import { STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {
      showError: true,
      displayDefaultIndicatorType: false
    }
  }]
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  otp: any;
  message = "";
  form: any;
  mailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  otpFormControl = new FormControl('', [
    Validators.maxLength(6),
    Validators.minLength(6),
    Validators.required
  ]);


  // Stepper
  completedSend = false;
  completedConfirm = false;
  completedDone = false;
  stepOne: FormGroup;
  stepTwo: FormGroup;
  stepThree: FormGroup;

  constructor(private mailService: MailService,
              private router: Router,
              private builder: FormBuilder) {
    this.stepOne = builder.group({
      isNotEmpty: [
          '',
          Validators.compose(
              [Validators.required]
          )
      ]
    });
    this.stepTwo = builder.group({
      isNotEmpty: [
        '',
        Validators.compose(
            [Validators.required]
        )
      ]
    });
    this.stepThree = builder.group({
      isNotEmpty: [
        '',
        Validators.compose(
            [Validators.required]
        )
      ]
    });
  }

  ngOnInit(): void {
  }



  backLogin() {
    this.router.navigate(['account']);
  }

  forgotPassword() {
    console.log(this.email);
    swal("OTP sending... Waiting a minus, Please!")
    this.mailService.forgotPassword(this.email).subscribe(data=>{
      console.log(data)
      if(data == true){
        this.completedSend = true;
        swal("Sent OTP, Please check your email and enter the OTP code","","success")
        localStorage.setItem("email",this.email);
        this.message = '';
        // this.router.navigate(["/confirm-otp"]);
      }else{
        this.message="Wrong email, Please try again!"
      }
    },error =>  {
      swal("Wrong email, Please try again!","","error")
    })
  }

}
