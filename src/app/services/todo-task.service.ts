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


  addNewTask(listId: number, name: string): Observable<ITask> {
    const params = {
      name,
      completed: false
    };
    return this.restService.post(environment.apiUrl + '/lists/' + listId + '/tasks', params)
      .pipe(
        map(res => {
          if (res) {
            return res as ITask;
          }
          throwError('Error');
        }
      ));
  }

    editTask(listId: number, taskId: number, task: ITask): Observable<ITask> {
    const params = {
      name: task.name,
      completed: task.completed,
      listId: task.listId
    };
    return this.restService.put(environment.apiUrl + '/lists/' + listId + '/tasks/' + taskId, params)
      .pipe(
        map(res => {
          if (res) {
            return res as ITask;
          }
          throwError('Error');
        }
      ));
  }

  deleteTask(listId: number, taskId: number): Observable<boolean> {
    return this.restService.delete(environment.apiUrl + '/lists/' + listId + '/tasks/' + taskId)
      .pipe(
        map(res => {
          if (res) {
            return true;
          }
          throwError('Error');
        }
      ));
  }

  getTasks(listId: number): Observable<ITask[]> {
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
