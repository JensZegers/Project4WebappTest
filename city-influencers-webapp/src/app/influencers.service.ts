import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { GlobalConstrants } from './globalConstrants';

@Injectable({
  providedIn: 'root'
})
export class InfluencersService {

  constructor(private httpClient: HttpClient) {
   }
   getInfluencers(): Observable<User[]>{
    return this.httpClient.get<User[]>(GlobalConstrants.apiUrl + "/users/influencers");
  }

  getNonActiveInfluencers(): Observable<User[]>{
    return this.httpClient.get<User[]>(GlobalConstrants.apiUrl + "/users/inactive");
  }
  deleteInfluencer(id: number): Observable<User> {
    return this.httpClient.delete<User>(GlobalConstrants.apiUrl + "/users/"+ id);
  }
  getInfluencerById(id: number): Observable<User>{
    return this.httpClient.get<User>(GlobalConstrants.apiUrl+"/users/"+ id);
  }

  putInfluencer(id:number, user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<User>(GlobalConstrants.apiUrl+ "/users/" + id, user, {headers: headers});
  }
}
