import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { GlobalConstrants } from './globalConstrants';
import { AddAdmin } from './add-admin-form/add-admin';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private httpClient: HttpClient) { }

  getAdmins(): Observable<User[]>{
    return this.httpClient.get<User[]>(GlobalConstrants.apiUrl+ "/users/admins");
  }


  deleteAdmin(id: number): Observable<User> {
    return this.httpClient.delete<User>(GlobalConstrants.apiUrl + "/users/"+ id);
  }
  getAdminById(id: number): Observable<User>{
    return this.httpClient.get<User>(GlobalConstrants.apiUrl+"/users/"+ id);
  }

  postAdmin(user: AddAdmin): Observable<AddAdmin> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<AddAdmin>(GlobalConstrants.apiUrl+ "/users", user, {headers: headers});

  }

  putAdmin(id:number, user: AddAdmin): Observable<AddAdmin> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<AddAdmin>(GlobalConstrants.apiUrl+ "/users/" + id, user, {headers: headers});
  }
}
