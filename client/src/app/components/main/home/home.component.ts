import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ServicesService) { }

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

  getAllNodes() {
    this.apiService.getAllNodes().subscribe((res: any) => {
      console.log(res, 'All Node Response');
      this.Node = res;
    });
  }

  getSindleNodes(id: any) {
    this.apiService.getSindleNodes(id).subscribe((res: any) => {
      this.view = 'Edit';
      this.editForm = res;
      this.form.controls.name.setValue(this.editForm[0].name);
      console.log(res, 'Single Node Response');
    })
  }

  deleteSingleNode(id: any) {
    this.apiService.deleteSingleNode(id).subscribe((res) => {
      console.log(res, 'delete Response');
      this.getAllNodes();
    })
  }

  insertSingleNode() {
    const req = {
      "id": "",
      "name": this.form.controls.name.value
    }
    this.apiService.insertSingleNode(req).subscribe((res) => {
      console.log(res, 'Insert Response');
      this.getAllNodes();
    })
  }

  updateSingleNode() {
    const req = {
      "id": this.editForm[0].id,
      "name": this.form.controls.name.value
    }
    this.apiService.updateSingleNode(req).subscribe((res) => {
      console.log(res, 'Update Response');
      this.getAllNodes();
      this.editForm = [];
      this.form.reset();
      this.view = 'Add';
    })
  }
}
