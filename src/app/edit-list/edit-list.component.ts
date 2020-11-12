import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITask } from '../modals/list';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TodoListService } from '../services/todo-list.service';
import { ToDoTaskService } from '../services/todo-task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  listName = '';
  periousListName = '';
  newTask = '';
  tasks: ITask[] = [];
  listId: number;
  constructor(
    private route: ActivatedRoute,
    private taskService: ToDoTaskService,
    private todoListService: TodoListService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = +params.get('id');
      this.listName = params.get('name');
      this.periousListName = this.listName;
      this.getTasks();
    });
  }


  editListName() {
    this.todoListService.editList(this.listId, this.listName).subscribe(
      res => {
        this.periousListName = this.listName;
      },
      error => {
        console.log('getTasks Error', error);
      }
    );
  }

  backtoDoListScreen() {
    this.router.navigate(['/..']);
  }

  onCheckboxChange(taskId: number) {
    this.tasks.forEach(item => {
      if (item.id === taskId) {
        item.completed = !item.completed;
        this.taskService.editTask(this.listId, taskId, item).subscribe(
          res => {},
          error => {
            console.log('deleteList Error', error);
          }
        );
      }
    });
  }

  getTasks() {
    this.taskService.getListTasks(this.listId).subscribe(
      res => {
        this.tasks = res;
      },
      error => {
        console.log('getTasks Error', error);
      }
    );
  }

  createTask() {
    this.taskService.addNewTask(this.listId, this.newTask).subscribe(
      res => {
        this.tasks.unshift(res);
        this.newTask = '';
      },
      error => {
        console.log('createTask Error', error);
      }
    );
  }

  updateTask(task: ITask) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      task
    };
    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.taskService.editTask(data.list_id, data.id, data).subscribe(
        res => {},
        error => {
          console.log('deleteList Error', error);
        }
      );
    });
  }

  deleteTask(id: number, index: number) {
    this.taskService.deleteTask(this.listId, id).subscribe(
      res => {
        this.tasks.splice(index, 1);
      },
      error => {
        console.log('deleteList Error', error);
      }
    );
  }
}
