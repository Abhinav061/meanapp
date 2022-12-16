import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private apiService: ServicesService,
    private router: Router) { }

  title = 'client';
  Node: any;
  view = 'Add';
  form = new FormGroup({
    name: new FormControl(''),
  });
  editForm: any;

  events: string[] = [];
  opened: boolean = true;

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

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
