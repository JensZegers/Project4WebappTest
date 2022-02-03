import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthUser} from './user';
import {Observable} from 'rxjs';
import {UserResponse} from './userResponse';
import { GlobalConstrants } from '../globalConstrants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUser(): AuthUser | null {
    if (this.isLoggedIn()){
      return {
        firstName: 'user',
        email: localStorage.getItem('email') ?? '',
        password: '',
         };
    } else {
      return null;
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  authenticate(user: AuthUser): Observable<UserResponse> {
    console.log(user);
    return this.httpClient.post<UserResponse>(GlobalConstrants.apiUrl + '/users/authenticate', user);
  }
}

