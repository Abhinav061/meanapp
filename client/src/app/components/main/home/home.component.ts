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
  userName = localStorage.getItem('loggedUserName')
  userId = localStorage.getItem('loggedUserId')

  ngOnInit() {
    this.allUserData();
  }

  // getAllNodes() {
  //   this.apiService.getAllNodes().subscribe((res: any) => {
  //     console.log(res, 'All Node Response');
  //     this.Node = res;
  //   });
  // }

  // getSindleNodes(id: any) {
  //   this.apiService.getSindleNodes(id).subscribe((res: any) => {
  //     this.view = 'Edit';
  //     this.editForm = res;
  //     this.form.controls.name.setValue(this.editForm[0].name);
  //     console.log(res, 'Single Node Response');
  //   })
  // }

  // deleteSingleNode(id: any) {
  //   this.apiService.deleteSingleNode(id).subscribe((res) => {
  //     console.log(res, 'delete Response');
  //     this.getAllNodes();
  //   })
  // }

  // insertSingleNode() {
  //   const req = {
  //     "id": "",
  //     "name": this.form.controls.name.value
  //   }
  //   this.apiService.insertSingleNode(req).subscribe((res) => {
  //     console.log(res, 'Insert Response');
  //     this.getAllNodes();
  //   })
  // }

  // updateSingleNode() {
  //   const req = {
  //     "id": this.editForm[0].id,
  //     "name": this.form.controls.name.value
  //   }
  //   this.apiService.updateSingleNode(req).subscribe((res) => {
  //     console.log(res, 'Update Response');
  //     this.getAllNodes();
  //     this.editForm = [];
  //     this.form.reset();
  //     this.view = 'Add';
  //   })
  // }

    ////////////////////////////////////////////////////////////////////////


    insertUserData() {
      const req = {
        "id": "",
        "name": this.form.controls.name.value,
        "added_by_user_id" : localStorage.getItem('loggedUserId'),
        "added_by_user_name" : localStorage.getItem('loggedUserName')
      }
      this.apiService.insertUserData(req).subscribe((res) => {
        console.log(res, 'Insert Response');
        this.allUserData();
      })
    }


    updateUserData() {
      const req = {
        "id": this.editForm[0].id,
        "name": this.form.controls.name.value,
        "added_by_user_id" : localStorage.getItem('loggedUserId'),
        "added_by_user_name" : localStorage.getItem('loggedUserName')
      }
      this.apiService.updateUserData(req).subscribe((res) => {
        console.log(res, 'Update Response');
        this.allUserData();
        this.editForm = [];
        this.form.reset();
        this.view = 'Add';
      })
    }

    editUserData(id: any) {
      this.apiService.editUserData(id).subscribe((res: any) => {
        this.view = 'Edit';
        this.editForm = res;
        this.form.controls.name.setValue(this.editForm[0].name);
        console.log(res, 'Single Node Response');
      })
    }

    deleteUserData(id: any) {
      this.apiService.deleteUserData(id).subscribe((res) => {
        console.log(res, 'delete Response');
        this.allUserData();
      })
    }

    allUserData() {
      this.apiService.allUserData(this.userId).subscribe((res: any) => {
        console.log(res, 'All Node Response');
        this.Node = res;
      });
    }


}
