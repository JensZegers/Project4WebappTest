import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstrants } from './globalConstrants';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {

  }
  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(GlobalConstrants.apiUrl+'/users');
  }

  getUserById(id: string): Observable<User>{
    return this.httpClient.get<User>(GlobalConstrants.apiUrl + '/users'+ id);
  }

}
