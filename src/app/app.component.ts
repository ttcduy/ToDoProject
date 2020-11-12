import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(public authService: AuthService, private router: Router) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.checkAuthenticated();
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      },
      error => {
        console.log('Logout error', error);
      }
    );
  }
}
