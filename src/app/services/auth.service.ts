import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private restService: RestService) { }

  login(auth: any): Observable<any> {
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${auth.username}:${auth.password}`)
    });
    return this.restService.post(environment.apiUrl + '/auth/login', null, headers)
      .pipe(
        map(d => {
          this.isAuthenticated.next(true);
          return d;
        },
          throwError('Could not be authenticated')
    ));
  }

  logout(): Observable<boolean> {
    return this.restService.post(environment.apiUrl + '/auth/logout', null)
      .pipe(
        map(d => {
          this.isAuthenticated.next(false);
          localStorage.removeItem('apiKey');
          return true;
        },
          throwError('Could not be authenticated')
    ));
  }

  checkAuthenticated(): boolean {
    return (localStorage.getItem('apiKey') !== null);
  }
}
