import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiService: ServicesService,
    private loginService: LoginService) { }

  title = 'client';
  Node: any;
  view = 'Add';
  form = new FormGroup({
    name: new FormControl(''),
  });
  editForm: any;
  userName : any;
  userId : any;
  userRole : any;
  loader: any[] = [];

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.loader.push(1);
      this.loginService.getUserDetails().subscribe({
        next: (res : any) => {
          this.userName = res.user.name;
          this.userId = res.user.id;
          this.userRole = res.user.role;
          this.userData();
          this.loader.pop();
        },
        error: (err) => {
          this.loader.pop();
        }
      });
  }

  insertUserData() {
    this.loader.push(1);
    const req = {
      "id": "",
      "name": this.form.controls.name.value,
      "added_by_user_id": this.userId,
      "added_by_user_name": this.userName
    }
    this.apiService.insertUserData(req).subscribe((res) => {
      this.userData();
      this.loader.pop();
    })
  }


  updateUserData() {
    this.loader.push(1);
    const req = {
      "id": this.editForm[0].id,
      "name": this.form.controls.name.value,
      "added_by_user_id": this.userId,
      "added_by_user_name": this.userName
    }
    this.apiService.updateUserData(req).subscribe((res) => {
      this.userData();
      this.editForm = [];
      this.form.reset();
      this.view = 'Add';
      this.loader.pop();
    })
  }

  editUserData(id: any) {
    this.loader.push(1);
    this.apiService.editUserData(id).subscribe((res: any) => {
      this.view = 'Edit';
      this.editForm = res;
      this.form.controls.name.setValue(this.editForm[0].name);
      this.loader.pop();
    })
  }

  deleteUserData(id: any) {
    this.loader.push(1);
    this.apiService.deleteUserData(id).subscribe((res) => {
      this.userData();
      this.loader.pop();
    })
  }

  userData() {
    this.loader.push(1);
    if (this.userRole == 'admin') {
      this.apiService.alluserData().subscribe((res: any) => {
        this.Node = res;
        this.loader.pop();
      });
    } else if (this.userRole == 'user') {
      this.apiService.userData(this.userId).subscribe((res: any) => {
        this.Node = res;
        this.loader.pop();
      });
    }
  }


}
