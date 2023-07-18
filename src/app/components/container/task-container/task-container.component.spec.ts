import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Task } from '../../../models/task';
import { timeZones } from '../../../shared/constent';
import { MatPackageModule } from '../../../shared/modules/mat-package.module';
import * as fromTask from '../../../store/reducers';
import { RootReducerState } from '../../../store/reducers';
import { getActionError, getActionLoaded, getActionLoading, getActionTasks } from '../../../store/selectors/task-selector.selectors';
import { TaskContainerComponent } from './task-container.component';

describe('TaskContainerComponent', () => {
  let component: TaskContainerComponent;
  let fixture: ComponentFixture<TaskContainerComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  };
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
  let store: MockStore<RootReducerState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskContainerComponent],
      imports: [
        MatPackageModule,
        StoreModule.forRoot(provideMockStore),
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            actionType: 'Update',
            task: undefined
          }
        }, provideMockStore({ initialState: fromTask.rootReducer.tasks })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    store = TestBed.inject(MockStore<RootReducerState>);
    fixture = TestBed.createComponent(TaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify the value of timeZoneClass', () => {
    component.taskList = taskList;
    expect(component.timeZoneClass).toBe('col-sm-7 d-flex justify-content-end');

    component.taskList = [];
    expect(component.timeZoneClass).toBe('col-sm-12 justify-content-between');

    component.taskList = taskList;
  });

  it('should verify the value of showContent', () => {
    component.loaded = false;
    component.loading = true;
    expect(component.showContent).toBeFalsy();

    component.loaded = true;
    component.loading = false;
    expect(component.showContent).toBeTruthy();
  });

  it('should open ADD-UPDATE popup', () => {
    const dialog = spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(true)
    } as MatDialogRef<typeof component>);

    component.addTask('Add');
    expect(dialog).toHaveBeenCalled();
  });

  it('should check the selection of timexone', () => {
    component.timeZone = timeZones[0].zone;
    component.selectionChange('America/New_York');
    expect(component.timeZone).toBe('America/New_York');
  });

  it('should call fetchAllTasks to get all the tasks with no force refresh call', () => {
    let spySelect = spyOn(component.store, 'select');
    let getActionTasks$ = spySelect.and.callFake(() => of(getActionTasks));
    let getTaskLoading$ = spySelect.and.callFake(() => of(getActionLoading));
    let getTaskLoaded$ = spySelect.and.callFake(() => of(getActionLoaded));
    let getError$ = spySelect.and.callFake(() => of(getActionError));

    let combineLatestObser = spySelect.and.callFake(() => of(undefined));
    component.fetchAllTasks();
    expect(getActionTasks$).toHaveBeenCalled();
    expect(getTaskLoading$).toHaveBeenCalled();
    expect(getTaskLoaded$).toHaveBeenCalled();
    expect(getError$).toHaveBeenCalled();
    expect(combineLatestObser).toHaveBeenCalled();
  });

  it('should call fetchAllTasks to get all the tasks with force refresh call', () => {
    let spySelect = spyOn(component.store, 'select');
    let getActionTasks$ = spySelect.and.callFake(() => of(getActionTasks));
    let getTaskLoading$ = spySelect.and.callFake(() => of(getActionLoading));
    let getTaskLoaded$ = spySelect.and.callFake(() => of(getActionLoaded));
    let getError$ = spySelect.and.callFake(() => of(getActionError));

    let combineLatestObser = spySelect.and.callFake(() => of([true, true]));
    component.fetchAllTasks(true);
    expect(getActionTasks$).toHaveBeenCalled();
    expect(getTaskLoading$).toHaveBeenCalled();
    expect(getTaskLoaded$).toHaveBeenCalled();
    expect(getError$).toHaveBeenCalled();
    expect(combineLatestObser).toHaveBeenCalled();
  });

  it('should call refreshCall method', () => {
    let fetchAllTasks = spyOn(component, 'fetchAllTasks').and.callFake(() => of(true));
    component.refreshCall();
    expect(fetchAllTasks).toHaveBeenCalled();
  });

});
