import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, ) { }

  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + 'login/';
    const body = { "username": username, "password": password };
    return lastValueFrom(this.http.post(url, body));
  }

  public logout() {
    const url = environment.baseUrl + 'logout/';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return lastValueFrom(this.http.post(url, {}, { headers }));
  }

  public registerWithCredentials(username: string, password: string) {
    const url = environment.baseUrl + 'register/';
    const body = { "username": username, "password": password };
    return lastValueFrom(this.http.post(url, body));
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  
}
