import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl + 'todos/'; 

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

  addTodo(todo: { title: string }): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.post(this.apiUrl, todo, { headers });
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
