import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  routeParam: string | undefined;
  username!: string;

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const url = (event as NavigationEnd).url;
      this.routeParam = url.split('/').pop() || '';

      if (this.routeParam === 'todos') {
        this.loadUsername();
      }
    });
    // if (typeof window !== 'undefined') {
    //   this.username = localStorage.getItem('username') || '';
    //   console.log('Username:', this.username)
    // }
  }

  loadUsername(): void {
    this.username = localStorage.getItem('username') || '';
    console.log('Username:', this.username);
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.username = localStorage.getItem('username') || '';
  //     console.log('Username after view init:', this.username);
  //   }, 100);
  // }

  async logout() {
    try {
      await this.as.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigateByUrl('/logout');
      console.log('User successfully logged out')
    } catch (e) {
      console.error('Logout failed', e);
      alert('Logout fehlgeschlagen');
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}