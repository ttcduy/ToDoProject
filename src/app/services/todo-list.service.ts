import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

import { environment } from 'src/environments/environment.prod';
import { IList } from 'src/app/modals/list';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private restService: RestService) { }

  getLists(): Observable<IList[]> {
    return this.restService.get(environment.apiUrl + '/lists')
      .pipe(
        map(d => {
          if (d) {
            return d as IList[];
          }
          throwError('Error');
        }
      ));
  }

  deleteList(listId: number): Observable<boolean> {
    return this.restService.delete(environment.apiUrl + '/lists/' + listId)
      .pipe(
        map(res => {
          if (res) {
            return true;
          }
          throwError('Error');
        }
      ));
  }

  editList(listId: number, name: string): Observable<IList> {
    const params = {
      name
    };
    return this.restService.put(environment.apiUrl + '/lists/' + + listId, params)
      .pipe(
        map(res => {
          if (res) {
            return res as IList;
          }
          throwError('Error');
        }
      ));
  }

  addNewList(name: string): Observable<IList> {
    const params = {
      name
    };
    return this.restService.post(environment.apiUrl + '/lists', params)
      .pipe(
        map(res => {
          if (res) {
            return res as IList;
          }
          throwError('Error');
        }
      ));
  }
}
