import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router){

  }
  canActivate():boolean{
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['home'])
      return false
    } else {
      return true
    }
  }
  
}
