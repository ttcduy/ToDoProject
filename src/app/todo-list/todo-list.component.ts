import { Component, OnInit } from '@angular/core';
import { IList } from '../modals/list';
import { TodoListService } from '../services/todo-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  label = 'ToDo Lists';
  newList = '';
  lists: IList[] = [];
  constructor(private todoListService: TodoListService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  createList() {
    this.todoListService.addNewList(this.newList).subscribe((res: IList) => {
      this.lists.unshift(res);
      this.newList = '';
    });
  }

  editList(list: IList) {
    this.router.navigate(['/todo-list', list.id, list.name]);
  }

  getList() {
    this.todoListService.getLists().subscribe(res => {
      this.lists = res;
    }, error => {
      console.log('getLists Error', error);
    });
  }

  deleteList(id: number, index: number) {
    this.todoListService.deleteList(id).subscribe(res => {
      this.lists.splice(index, 1);
    });
  }

}
