import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private loginService : LoginService,
    private router: Router){

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
          this.router.navigate(['home'])
        },
        error:(err)=>{
          console.log('Login error is', err);
          
        }
      });
    }
  }

  onsignup(){
    if(this.signupForm.valid){
      console.log(this.signupForm)
      this.loginService.signUp(this.signupForm.value).subscribe((res : any)=>{
        console.log(res, 'Login Response');
    });
    }
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