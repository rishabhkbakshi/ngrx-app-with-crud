import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChange } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Task } from '../../models/task';
import { MatPackageModule } from '../../shared/modules/mat-package.module';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskList: Task[] = [{
    id: 1,
    taskName: 'Task 1 - Updated',
    taskDescription: 'Need to do task 1',
    lastModified: '1689318119462'
  },
  {
    id: 3,
    taskName: 'Task 3 - Updated',
    taskDescription: 'Need to do task 3',
    lastModified: '1689316675664'
  },
  {
    id: 4,
    taskName: 'Task 4 - Updated',
    taskDescription: 'Need to do task 4',
    lastModified: '1689318104224'
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPackageModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [TaskListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open UPDATE popup when no taskId is given', () => {
    const dialog = spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);

    component.updateTask('Update');
    expect(dialog).toHaveBeenCalled();
  });

  it('should open UPDATE popup when taskId is given', () => {
    component.tasks = taskList;
    const dialog = spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);

    component.updateTask('Update', 2);
    expect(dialog).toHaveBeenCalled();
  });

  it('should open DELETE popup', () => {
    component.tasks = taskList;
    const dialog = spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);

    component.deleteTask(1);
    expect(dialog).toHaveBeenCalled();
  });

  it('should call ngOnChanges for asia time zone', () => {
    // let tasks = [...taskList];
    // console.log(taskList);
    // tasks = tasks.sort((a, b) => {
    //   return (a.id - b.id);
    // })
    // console.log(tasks);

    component.tasks = taskList;
    taskList.sort((a: Task, b: Task) => {
      return (new Date(a.lastModified).getTime()) - (new Date(b.lastModified).getTime());
    });
    let actual = taskList[0].id;
    component.zoneStr = 'GMT+05:30';
    component.ngOnChanges(new SimpleChange(undefined, 'GMT+05:30', true));
    let expected = taskList[0].id;
    expect(actual).toBe(expected);
  });

  it('should call ngOnChanges for america time zone', () => {
    component.tasks = taskList;
    taskList.sort((a: Task, b: Task) => {
      return (new Date(a.lastModified).getTime()) - (new Date(b.lastModified).getTime());
    });
    let actual = taskList[0].id;
    component.zoneStr = 'GMT-11:00';
    component.ngOnChanges(new SimpleChange('GMT-05:30', 'GMT-11:00', true));
    let expected = taskList[0].id;
    expect(actual).toBe(expected);
  });

  it('should call ngOnChanges for europe time zone', () => {
    component.tasks = taskList;
    taskList.sort((a: Task, b: Task) => {
      return (new Date(a.lastModified).getTime()) - (new Date(b.lastModified).getTime());
    });
    let actual = taskList[0].id;
    component.zoneStr = 'GMT-08:00';
    component.ngOnChanges(new SimpleChange('GMT+05:30', 'GMT-11:00', true));
    let expected = taskList[0].id;
    expect(actual).toBe(expected);
  });
});
