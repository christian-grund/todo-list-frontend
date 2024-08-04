import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  todos: any = [];
  error = '';
  isChecked = false;

  constructor(private http: HttpClient, private authService: AuthService) { }


  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log('todos:', this.todos)
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }


  loadTodos() {
    const url = environment.baseUrl + 'todos/';
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return lastValueFrom(this.http.get(url, { headers }));
  }

  // Patch-Request
  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }
}
