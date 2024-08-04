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

  async addTodo() {
    if (this.newTodo.trim()) {
      try {
        await this.authService.addTodo({ title: this.newTodo }).toPromise();
        this.newTodo = ''; // Clear the input after adding
        // Update todos list
        this.todos = await this.loadTodos();
      } catch (error) {
        console.error('Error adding todo', error);
        this.error = 'Fehler beim Hinzufügen des Todos!';
      }
    }
  }

  async deleteTodo(index: number): Promise<void> {
    console.log('todos[index]:', this.todos[index]);
    const todoId = this.todos[index].id; // Hole die ID des Todos
    console.log('todoId:', todoId)
    this.authService.deleteTodo(todoId).subscribe(
      () => {
        // Entferne das Todo aus der lokalen Liste nach erfolgreicher Löschung
        this.todos.splice(index, 1);
        // this.todos = this.loadTodos();
      },
      (error) => {
        console.error('Fehler beim Löschen des Todos:', error);
        // Fehlerbehandlung, falls gewünscht
      }
    );
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
  toggleCheckbox(index: number) {
    const todo = this.todos[index];
    const newCheckedState = !todo.checked;
    this.authService.updateTodoChecked(todo.id, newCheckedState).subscribe(() => {
      todo.checked = newCheckedState;
    });
  }

  getCheckboxImagePath(checked: boolean) {
    return checked ? '../../../assets/img/checkbox-checked.svg' : '../../../assets/img/checkbox-empty.svg';
  }
}
