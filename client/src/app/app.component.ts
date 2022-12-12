import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from './shared/services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private apiService: ServicesService){}

  title = 'client';
  Node: any;
  view = 'Add';
  form = new FormGroup({
    name: new FormControl(''),
   });
   editForm: any;

  ngOnInit() {
  this.getAllNodes();
  }

  getAllNodes(){
    this.apiService.getAllNodes().subscribe((res : any)=>{
      console.log(res, 'All Node Response');
      this.Node = res;
  });
  }

  // getAllNodes(){
  //   this.httpClient.get('/get-all-node').subscribe((res)=>{
  //     console.log(res, 'All Node Response');
  //     this.Node =res
  //   })
  // }

  getSindleNodes(id:any){
    this.apiService.getSindleNodes(id).subscribe((res:any)=>{
      this.view = 'Edit';
      this.editForm = res;
      this.form.controls.name.setValue(this.editForm[0].name);
      console.log(res, 'Single Node Response');
    })
  }
  
  // getSindleNodes(id:any){
  //   this.httpClient.get(`/get-single-node/${id}`).subscribe((res)=>{
  //     console.log(res, 'Single Node Response');
  //   })
  // }

  deleteSingleNode(id:any){
    this.apiService.deleteSingleNode(id).subscribe((res)=>{
      console.log(res, 'delete Response');
      this.getAllNodes();
    })
  }

  // deleteSingleNode(id:any){
  //   this.httpClient.delete(`/delete-single-node/${id}`).subscribe((res)=>{
  //     console.log(res, 'delete Response');
  //     this.getAllNodes();
  //   })
  // }

  insertSingleNode(){
    const req = {
      "id" : "",
      "name" : this.form.controls.name.value
    }
    this.apiService.insertSingleNode(req).subscribe((res)=>{
      console.log(res, 'Insert Response');
      this.getAllNodes();
    })
  }

  // insertSingleNode(){
  //   const req = {
  //     "id" : "",
  //     "name" : this.form.controls.Name.value
  //   }
  //   this.httpClient.post(`/insert-single-node`,req).subscribe((res)=>{
  //     console.log(res, 'Insert Response');
  //     this. getAllNodes();
  //   })
  // }

  updateSingleNode(){
    const req = {
      "id" : this.editForm[0].id,
      "name" : this.form.controls.name.value
    }
    this.apiService.updateSingleNode(req).subscribe((res)=>{
      console.log(res, 'Update Response');
      this.getAllNodes();
      this.editForm = [];
      this.form.reset();
      this.view = 'Add';
    })
  }

  // updateSingleNode(){
  //   const req = {
  //     "id" : "",
  //     "name" : ""
  //   }
  //   this.httpClient.put(`/update-node-with-id`,req).subscribe((res)=>{
  //     console.log(res, 'Update Response');
  //   })
  // }

}
