import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
    canActivate() {
      return this.checkLogged();
  }

  checkLogged() {
    const token = localStorage.getItem('apiKey');
    if (token != null) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
