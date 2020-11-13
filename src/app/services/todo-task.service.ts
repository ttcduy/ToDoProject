import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';
import { ITask, IList } from 'src/app/modals/list';

@Injectable({
  providedIn: 'root'
})
export class ToDoTaskService {

  constructor(private restService: RestService) { }


  addNewTask(listId: number, name: string) {
    const params = {
      name,
      completed: false
    };
    return this.restService.post(environment.apiUrl + '/lists/' + listId + '/tasks', params);
  }

  editTask(listId: number, taskId: number, task: ITask, params: any) {
    return this.restService.put(environment.apiUrl + '/lists/' + listId + '/tasks/' + taskId, params);
  }

  deleteTask(listId: number, taskId: number) {
    return this.restService.delete(environment.apiUrl + '/lists/' + listId + '/tasks/' + taskId);
  }

  getListTasks(listId: number): Observable<ITask[]> {
    return this.restService.get(environment.apiUrl + '/lists/' + listId + '/tasks')
      .pipe(
        map(res => {
          if (res) {
            return res as ITask[];
          }
          throwError('Error');
        }));
  }
}
