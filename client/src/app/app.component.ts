import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient){}

  title = 'client';
  Node: any;

  form = new FormGroup({
    Name: new FormControl(''),
   });

  ngOnInit() {
  this.getAllNodes();
  }

  getAllNodes(){
    this.httpClient.get('/get-all-node').subscribe((res)=>{
      console.log(res, 'All Node Response');
      this.Node =res
    })
  }
  
  getSindleNodes(id:any){
    this.httpClient.get(`/get-single-node/${id}`).subscribe((res)=>{
      console.log(res, 'Single Node Response');
    })
  }

  deleteSingleNode(id:any){
    this.httpClient.delete(`/delete-single-node/${id}`).subscribe((res)=>{
      console.log(res, 'delete Response');
      this.getAllNodes();
    })
  }

  insertSingleNode(){
    const req = {
      "id" : "",
      "name" : this.form.controls.Name.value
    }
    this.httpClient.post(`/insert-single-node`,req).subscribe((res)=>{
      console.log(res, 'Insert Response');
      this. getAllNodes();
    })
  }

  updateSingleNode(){
    const req = {
      "id" : "",
      "name" : ""
    }
    this.httpClient.put(`/update-node-with-id`,req).subscribe((res)=>{
      console.log(res, 'Update Response');
    })
  }

}
