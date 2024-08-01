import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, ) { }

  public loginWithUsernameAndPassword(username: string, password: String) {
    const url = environment.baseUrl + 'login/';
    const body = { "username": username, "password": password };
    console.log('lastValueFrom:', this.http.post(url, body))
    return lastValueFrom(this.http.post(url, body));
  }

  public logout() {
    const url = environment.baseUrl + 'logout/';
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in local storage');
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return lastValueFrom(this.http.post(url, {}, { headers }));
  }
}
