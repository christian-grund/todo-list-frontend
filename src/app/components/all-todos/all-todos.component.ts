import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  todos: any = [];
  newTodo: string = '';
  error = '';
  isChecked = false;

  constructor(private http: HttpClient, private authService: AuthService) { }


  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.authService.addTodo({ title: this.newTodo }).subscribe(
        response => {
          console.log('Todo added', response);
          this.newTodo = ''; // Clear the input after adding
        },
        error => {
          console.error('Error adding todo', error);
        }
      );
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
