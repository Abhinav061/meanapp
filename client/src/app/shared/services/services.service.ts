import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient : HttpClient) {}

//   getAllNodes(){
//      return this.httpClient.get('/api/get-all-node');
//   }
  
//   getSindleNodes(req:any){
//      return this.httpClient.get(`/api/get-single-node/${req}`);
//   }

  editUserData(req:any){
   return this.httpClient.get(`/api/edit-user-data/${req}`);
   }


//   deleteSingleNode(req:any){
//      return this.httpClient.delete(`/api/delete-single-node/${req}`);
//   }

  deleteUserData(req:any){
   return this.httpClient.delete(`/api/delete-user-data/${req}`);
   }

//   insertSingleNode(req:any){
//      return this.httpClient.post(`/api/insert-single-node`,req);
//   }

  insertUserData(req:any){
   return this.httpClient.post(`/api/insert-user-data`,req);
}

//   updateSingleNode(req:any){
//      return this.httpClient.put(`/api/update-node-with-id`,req);
//   }

  updateUserData(req:any){
   return this.httpClient.put(`/api/update-user-data`,req);
  }

  allUserData(req:any){
   return this.httpClient.get(`/api/all-user-data/${req}`);
}

}
