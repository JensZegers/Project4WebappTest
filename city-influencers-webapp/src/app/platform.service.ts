import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstrants } from './globalConstrants';
import { Platform } from './platform';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private httpClient: HttpClient) { }

  getPlatforms(): Observable<Platform[]>{
    return this.httpClient.get<Platform[]>(GlobalConstrants.apiUrl+'/platforms');
  }
}
