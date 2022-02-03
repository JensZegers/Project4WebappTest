import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './city';
import { GlobalConstrants } from './globalConstrants';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  getCities(): Observable<City[]>{
    return this.httpClient.get<City[]>(GlobalConstrants.apiUrl + "/cities");
  }

  postCity(city: City): Observable<City> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<City>(GlobalConstrants.apiUrl+ "/cities", city, {headers: headers});
  }

  getCityById(id: number): Observable<City>{
    return this.httpClient.get<City>(GlobalConstrants.apiUrl+"/cities/"+id);
  }

  putCity(id:number, city: City): Observable<City> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<City>(GlobalConstrants.apiUrl+ "/cities/" + id, city, {headers: headers});
  }

  deleteCity(id: number): Observable<City> {
    return this.httpClient.delete<City>(GlobalConstrants.apiUrl+ "/cities/" + id);
  }

}
