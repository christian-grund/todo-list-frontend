import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password1: string = '';
  password2: string = '';

  constructor( private as: AuthService, private router: Router) {}

  async register() {
    try {
      let response = await this.as.registerWithCredentials(this.username, this.password1);
      console.log('Registration successful:', response);
      this.router.navigateByUrl('/login');
    } catch (err) {
      console.error('Registration failed', err)
    }
  }

}
