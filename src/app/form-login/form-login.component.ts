import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SignUpForm} from "./model/SignUpForm";
import {LoginForm} from "./model/LoginForm";
import {AuthService} from "./service/auth.service";
import {TokenService} from "./service/token.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit, AfterViewInit {

  formLogin: any = {};

  statusRegister = '';

  statusLogin = '';

  hide = true;

  form: any = {};

  signUpForm: SignUpForm;

  loginForm: LoginForm;

  message: string;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  get username() {
    return this.form.get("username");
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  mailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ])

  register() {

    this.signUpForm = new SignUpForm(
        this.form.username,
        this.form.email,
        this.form.password,
        // @ts-ignore
        this.form.status
    );

    this.authService.signUp(this.signUpForm).subscribe(data => {
          console.log('data ---> ', data);
          if (data != null) {
            this.statusRegister = 'Register Success!';
            return;
          }
        }, we => {
          console.log('we ---> ', we);
          console.log('message --->', we.error.message);
          if (we.error.message === 'nouser') {
            this.statusRegister = 'Username is existed! Please try again!';
            return;
          } else if (we.error.message === 'noemail') {
            this.statusRegister = 'Email is existed! Please try again!';
            return;
          } else {
            this.statusRegister = 'Mail invalid! Please try again!';
          }
        }
        //       error => {
        // console.log('error ---> ', error);
        // if (error.we.error.message === 'nouser') {
        //   console.log('message:', error.we.error.message);
        //   // this.status = 'Username is existed! Please try again!';
        // }
    )
  }

  comparePassword() {
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({confirmPassword: true});
    } else {
      this.confirmPassword.setErrors(null);
    }
  }

  login() {
    console.log('Vao login roi!')
    this.loginForm = new LoginForm(
        this.form.username,
        this.form.password
    );
    this.authService.login(this.form).subscribe(data => {
          console.log('Login data --- >', data);
          if (data.token != undefined) {
            this.tokenService.setID(data.id);
            this.tokenService.setToken(data.token);
            this.tokenService.setUsername(data.username);
            this.tokenService.setRoleSet(data.roleSet);

            this.statusLogin = 'Login Success!';

            if (data.roleSet[0].name == 'MANAGER') {
              this.router.navigate(['/manager/dashboard']);
            } else if (data.roleSet[0].name == 'USER') {
              this.router.navigate(['/user/exam/list']);
            }
          }
          // @ts-ignore
          if (data.message === 'lock') {
            this.statusLogin = 'Your account has been disabled, please contact admin!';
            return;
          }

        },
        we => {
          console.log('we of login ---> ', we);
          if (we.status == 400) {
            console.log('Login Failed!');
            this.statusLogin = 'Login Failed! Please check your account or password!';
          }
          else {
            this.statusLogin = 'Error!!!!!!';
          }
        })


  }



}