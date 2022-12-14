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
  loader: any[] = [];
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
      this.loader.push(1);
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginService.storeToken(res);
          this.getUserDetails();
          this.loader.pop();
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.loader.pop();
          this.errorSnackBarLogin(err);
        }
      });
    }
  }

  getUserDetails(){
    this.loader.push(1);
      this.loginService.getUserDetails().subscribe({
        next: (res : any) => {
          this.openSnackBarLogin(res);
          const emailBody ={
            "email" : res.user.email,
            "name" : res.user.name
          }
          this.loginService.sendLoginMail(emailBody).subscribe({
            next: (res) => {
              console.log('Mail sent!!', res);
            },
            error: (err) => {
              console.log('Mail Not sent', err);
            }
          });
          this.loader.pop();
        },
        error: (err) => {
          this.loader.pop();
          this.errorSnackBarLogin(err);
        }
      });
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
      
      this.loader.push(1);
      this.loginService.signUp(this.signupForm.value).subscribe({
        next: (res) => {

          this.loader.pop();
          this.openSnackBarSignUp();
        },
        error: (err) => {
          this.loader.pop();
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
    this.snackBar.open(`${err.error.msg}`, 'Ok', {
      duration: 3000
    });
  }

  resetPassword(url: string){
    window.open(url, "_blank");
}
}