import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient){}

  title = 'client';
  // Node = [
  //   {
  //     "id" : 1,
  //     "name" : "Mark"
  //   },
  //   {
  //     "id" : 2,
  //     "name" : "Markus"
  //   }
  // ]

  Node: any;

  ngOnInit() {
  this.getNodes();
  }
  getNodes(){
    this.httpClient.get('/get-all-node').subscribe((res)=>{
      console.log(res);
      this.Node =res
    })
  }
}
