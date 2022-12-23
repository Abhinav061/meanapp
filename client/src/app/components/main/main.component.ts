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
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
