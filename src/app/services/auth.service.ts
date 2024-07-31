import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, ) { }

  public loginWithUsernameAndPassword(username: string, password: String) {
    const url = environment.baseUrl + 'login/';
    console.log('login url:', url)
    const body = { "username": username, "password": password };
    return lastValueFrom(this.http.post(url, body));
  }

}
