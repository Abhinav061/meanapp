import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInUserDetails: any;
  name: any;
  email: any;
  id: any;
  role: any;
  constructor(
    private http : HttpClient
  ) { }


  signUp(userObj: any){
    return this.http.post(`/api/user/sign-up`,userObj);
  }

  login(loginObj: any){
    return this.http.post(`/api/user/login`,loginObj);
  }

  sendLoginMail(emailObj: any){
    return this.http.post('/api/email/login',emailObj);
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

  loggedInDetails(details : any){
    this.setUserEmail(details.user.email);
    this.setUserName(details.user.name);
    this.setUserId(details.user.id);
    this.setUserRole(details.user.role);
    
  }

  setUserEmail(email: any){
    this.email = email;
  }

  getUserEmail(){
    return this.email;
  }

  setUserName(name: any){
    this.name = name
  }

  getUserName(){
    return this.name
  }

  setUserId(id: any){
    this.role = id
  }

  getUserId(){
    return this.id
  }

  setUserRole(role: any){
    this.role = role
  }

  getUserRole(){
    return this.role
  }
}
