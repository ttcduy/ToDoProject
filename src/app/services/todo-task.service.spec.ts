import { TestBed } from '@angular/core/testing';

import { ToDoTaskService } from './todo-task.service';

describe('TodoTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToDoTaskService = TestBed.get(ToDoTaskService);
    expect(service).toBeTruthy();
  });
});
