import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voucher } from './voucher';
import { GlobalConstrants } from './globalConstrants';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {


  constructor(private httpClient: HttpClient) { }

  getVouchers(): Observable<Voucher[]>{
    return this.httpClient.get<Voucher[]>(GlobalConstrants.apiUrl+ "/vouchers");
  }

  deleteVoucher(id: number): Observable<Voucher> {
    return this.httpClient.delete<Voucher>(GlobalConstrants.apiUrl+ "/vouchers/"+ id);
  }
  getVoucherById(id: number): Observable<Voucher>{
    return this.httpClient.get<Voucher>(GlobalConstrants.apiUrl+"/vouchers/"+ id);
  }

  putVoucher(id:number, voucher: Voucher): Observable<Voucher> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Voucher>(GlobalConstrants.apiUrl+ "/vouchers/" + id, voucher, {headers: headers});
  }
  postVoucher(voucher: Voucher): Observable<Voucher> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Voucher>(GlobalConstrants.apiUrl+ "/vouchers", voucher, {headers: headers});
  }
}
