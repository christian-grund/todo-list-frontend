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
      this.router.navigateByUrl('/login');
    } catch (err) {
      console.error('Registration failed', err)
    }
  }

  enableBtn() {
    const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement;

    if (this.username.length >= 3 && this.password1.length >= 8 && this.password2.length >= 8 && this.password1 === this.password2) {
      registerBtn.disabled = false;
    } else {
      registerBtn.disabled = true;
    }
  }
}
