import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient : HttpClient) {}

  getAllNodes(){
     return this.httpClient.get('/get-all-node');
  }
  
  getSindleNodes(req:any){
     return this.httpClient.get(`/get-single-node/${req}`);
  }

  deleteSingleNode(req:any){
     return this.httpClient.delete(`/delete-single-node/${req}`);
  }

  insertSingleNode(req:any){
     return this.httpClient.post(`/insert-single-node`,req);
  }

  updateSingleNode(req:any){
     return this.httpClient.put(`/update-node-with-id`,req);
  }

}
