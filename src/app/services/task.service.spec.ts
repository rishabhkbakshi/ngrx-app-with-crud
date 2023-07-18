import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../models/task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let tasks: Task[] = [{
    id: 1,
    taskName: 'Task 1',
    taskDescription: 'Need to do task 1',
    lastModified: '168841501209'
  }, {
    id: 2,
    taskName: 'Task 2',
    taskDescription: 'Need to do task 12',
    lastModified: '168844501209'
  }, {
    id: 3,
    taskName: 'Task 3',
    taskDescription: 'Need to do task 1',
    lastModified: '161141501209'
  }];
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTasks to get all the tasks', () => {
    const taskList: Task[] = tasks;
    service.getTasks().subscribe((res) => {
      expect(res.length).toEqual(taskList.length);
    })

    const req = httpTestingController.expectOne(`${service.baseURL}task`);
    expect(req.request.method).toEqual('GET');

    req.flush(taskList);

    httpTestingController.verify();
  });

  it('should call addTask to add a task', () => {
    let task: Task = {
      id: 4,
      taskName: 'task 4',
      taskDescription: 'Need to do task 4',
      lastModified: '168841521209'
    }
    service.addTask(task).subscribe((res) => {
      expect(res.taskName).toEqual(task.taskName);
    })

    const req = httpTestingController.expectOne(`${service.baseURL}task`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(JSON.stringify(task));

    req.flush(task);

    httpTestingController.verify();
  });

  it('should call updateTask to update a task', () => {
    let task: Task = {
      id: 2,
      taskName: 'task 2 - Updated',
      taskDescription: 'Need to do task 2',
      lastModified: '168841521209'
    }
    service.updateTask(2, task).subscribe((res) => {
      expect(res.taskName).toEqual(task.taskName);
    })

    const req = httpTestingController.expectOne(`${service.baseURL}task/2`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(JSON.stringify(task));

    req.flush(task);

    httpTestingController.verify();
  });

  it('should call deleteTask to delete a task', () => {
    let task: Task = {
      id: 2,
      taskName: 'task 2',
      taskDescription: 'Need to do task 2',
      lastModified: '168841521209'
    }

    service.deleteTask(2).subscribe((res) => {
      expect(res).toEqual(task);
    })

    const req = httpTestingController.expectOne(`${service.baseURL}task/2`);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);

    req.flush(task);
    httpTestingController.verify();
  });
});
