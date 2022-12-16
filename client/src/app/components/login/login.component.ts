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
    private loginService : LoginService,
    private router: Router,
    private snackBar: MatSnackBar){

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['',Validators.required],
      password: ['',Validators.required]
    })

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_repeat: ['', Validators.required]
    })
  }
  // this.loginService.storeToken(res.token)

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm)
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res)=>{
          this.loginService.storeToken(res)
          this.openSnackBarLogin();
          this.router.navigate(['home'])
        },
        error:(err)=>{
          console.log('Login error is', err);
          
        }
      });
    }
  }

  openSnackBarLogin() {
    this.snackBar.open('Logged In Successfully', 'Ok', {
      duration: 3000
    });
  }

  onsignup(){
    if(this.signupForm.valid){
      console.log(this.signupForm)
      this.loginService.signUp(this.signupForm.value).subscribe((res : any)=>{
        this.openSnackBarSignUp();
    });
    }
  }

  openSnackBarSignUp() {
    this.snackBar.open(`${this.signupForm.value.name} - Registered  Succesfully!`, 'Ok', {
      duration: 3000
    });
  }



  toggleSignup(){
    (<HTMLInputElement>document.getElementById("login-toggle")).style.backgroundColor="#fff";
     (<HTMLInputElement>document.getElementById("login-toggle")).style.color="#222";
     (<HTMLInputElement>document.getElementById("signup-toggle")).style.backgroundColor="#57b846";
     (<HTMLInputElement>document.getElementById("signup-toggle")).style.color="#fff";
     (<HTMLInputElement>document.getElementById("login-form")).style.display="none";
     (<HTMLInputElement>document.getElementById("signup-form")).style.display="block";
 }
 
 toggleLogin(){
     (<HTMLInputElement>document.getElementById("login-toggle")).style.backgroundColor="#57B846";
     (<HTMLInputElement>document.getElementById("login-toggle")).style.color="#fff";
     (<HTMLInputElement>document.getElementById("signup-toggle")).style.backgroundColor="#fff";
     (<HTMLInputElement>document.getElementById("signup-toggle")).style.color="#222";
     (<HTMLInputElement>document.getElementById("signup-form")).style.display="none";
     (<HTMLInputElement>document.getElementById("login-form")).style.display="block";
 }
 

}