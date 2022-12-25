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
  submitted = false;
  checkPassword = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      password_repeat: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm)
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginService.loggedInDetails(res);
          this.loginService.storeToken(res)
          this.openSnackBarLogin(res);
          const emailBody ={
            "email" : localStorage.getItem('loggedUserEmail'),
            "name" : localStorage.getItem('loggedUserName')
          }
          this.loginService.sendLoginMail(emailBody).subscribe({
            next: (res) => {
              console.log('Mail sent!!', res);
            },
            error: (err) => {
              console.log('Mail Not sent', err);
            }
          });
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }else{
      alert('SUCCESS!!' + 'You Have Registered Successfully!')
    }
}

// check(e:any) {
//   console.log(e);
//   if (this.signupForm.value.password_repeat == this.loginForm.value.password && e !== '') {
//     this.checkPassword = 'true';
//   } else {
//     this.checkPassword = 'false';
//   }
// }

// get f() { return this.signupForm.controls; }

}