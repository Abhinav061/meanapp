import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  view = 'Login';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_repeat: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm)
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginService.storeToken(res)
          this.openSnackBarLogin(res);
          this.router.navigate(['home'])
        },
        error: (err) => {
          console.log('Login error is', err);
          this.errorSnackBarLogin(err);
        }
      });
    }
  }

  openSnackBarLogin(data: any) {
    this.snackBar.open(`Welcome ${data.user.name}!`, 'Ok', {
      duration: 3000
    });
  }

  errorSnackBarLogin(err: any) {
    this.snackBar.open(`${err.error.msg}`, 'Ok', {
      duration: 3000
    });
  }

  onsignup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm)
      this.loginService.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          this.openSnackBarSignUp();
        },
        error: (err) => {
          console.log('Login error is', err);
          this.errorSnackBarSignup(err);
        }
      });
    }
  }

  openSnackBarSignUp() {
    this.snackBar.open(`${this.signupForm.value.name} - Registered  Succesfully!`, 'Ok', {
      duration: 3000
    });
  }


  errorSnackBarSignup(err: any) {
    this.snackBar.open(`${err.error.message}`, 'Ok', {
      duration: 3000
    });
  }

}