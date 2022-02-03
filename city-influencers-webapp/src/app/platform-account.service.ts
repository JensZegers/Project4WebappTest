import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstrants } from './globalConstrants';
import { PlatformAccount } from './platformAccount';

@Injectable({
  providedIn: 'root'
})
export class PlatformAccountService {

  constructor(private httpClient: HttpClient) {}

  getAccountsByUserId(id: number): Observable<PlatformAccount[]>{
    return this.httpClient.get<PlatformAccount[]>(GlobalConstrants.apiUrl + "/platformaccounts/byuserid/"+ id);
  }

}
