import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInUserDetails: any;
  
  constructor(
    private http : HttpClient
  ) { }


  signUp(userObj: any){
    return this.http.post(`/api/user/sign-up`,userObj);
  }

  login(loginObj: any){
    return this.http.post(`/api/user/login`,loginObj);
  }

  getUserDetails(){
    return this.http.get(`/api/user/get-user-details`);
  }

  sendLoginMail(emailObj: any){
    return this.http.post('/api/user/login-mail',emailObj);
  }

  storeToken(tokenRes: any){
    const tokenValue = tokenRes.token
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
}
