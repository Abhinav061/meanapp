import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient : HttpClient) {}

  getAllNodes(){
     return this.httpClient.get('/api/get-all-node');
  }
  
  getSindleNodes(req:any){
     return this.httpClient.get(`/api/get-single-node/${req}`);
  }

  deleteSingleNode(req:any){
     return this.httpClient.delete(`/api/delete-single-node/${req}`);
  }

  insertSingleNode(req:any){
     return this.httpClient.post(`/api/insert-single-node`,req);
  }

  updateSingleNode(req:any){
     return this.httpClient.put(`/api/update-node-with-id`,req);
  }

}
