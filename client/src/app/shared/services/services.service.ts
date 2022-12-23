import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient: HttpClient) { }


  editUserData(req: any) {
    return this.httpClient.get(`/api/edit-user-data/${req}`);
  }


  deleteUserData(req: any) {
    return this.httpClient.delete(`/api/delete-user-data/${req}`);
  }

  insertUserData(req: any) {
    return this.httpClient.post(`/api/insert-user-data`, req);
  }

  updateUserData(req: any) {
    return this.httpClient.put(`/api/update-user-data`, req);
  }

  userData(req: any) {
    return this.httpClient.get(`/api/user-data/${req}`);
  }

  alluserData() {
    return this.httpClient.get(`/api/all-user-data`);
  }

}
