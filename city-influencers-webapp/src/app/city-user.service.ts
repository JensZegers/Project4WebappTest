import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCityUser } from './add-admin-form/addCityUser';
import { CityUser } from './cityUser';
import { GlobalConstrants } from './globalConstrants';

@Injectable({
  providedIn: 'root'
})
export class CityUserService {

  constructor(private httpClient: HttpClient) { }

  getCityUsers(): Observable<CityUser[]> {
    return this.httpClient.get<CityUser[]>(GlobalConstrants.apiUrl + "/cityusers");
  }

  getCityUserById(id: number): Observable<CityUser> {
    return this.httpClient.get<CityUser>(GlobalConstrants.apiUrl + "/cityusers/"+id);
  }

  getCityUserByAdminId(id:number): Observable<CityUser>{
    return this.httpClient.get<CityUser>(GlobalConstrants.apiUrl + "/cityusers/byAdminId/"+id);

  }

  postCityUser(cityUser: AddCityUser): Observable<AddCityUser> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<AddCityUser>(GlobalConstrants.apiUrl + "/cityusers", cityUser, {headers: headers});
  }

  putCityUser(id: number, cityUser: AddCityUser): Observable<AddCityUser> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<AddCityUser>(GlobalConstrants.apiUrl + "/cityusers/"+id, cityUser, {headers: headers});
  }

  deleteCityUser(id: number): Observable<CityUser> {
    return this.httpClient.delete<CityUser>(GlobalConstrants.apiUrl+"/cityusers/"+id);
  }
}
