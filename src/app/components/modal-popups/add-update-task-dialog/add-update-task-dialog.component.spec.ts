import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { TaskListAddAction, TaskListUpdateAction } from 'src/app/store/actions/task-action.actions';
import { MatPackageModule } from '../../../shared/modules/mat-package.module';
import * as fromTask from '../../../store/reducers';
import { AddUpdateTaskDialogComponent } from './add-update-task-dialog.component';

describe('AddUpdateTaskDialogComponent', () => {
  let component: AddUpdateTaskDialogComponent;
  let fixture: ComponentFixture<AddUpdateTaskDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  }
  let store: Store<fromTask.RootReducerState>;

  // seprate method to override MAT_DIALOG_DATA when modal-popup open in the test case
  const compileTheComponent = (useValue: any) => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AddUpdateTaskDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    fixture.detectChanges()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatPackageModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(fromTask.rootReducer)
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            actionType: 'Update',
            task: undefined
          }
        }
      ],
      declarations: [AddUpdateTaskDialogComponent]
    })
  });

  it('should create', () => {
    compileTheComponent({});
    expect(component).toBeTruthy();
  });

  it('should test the invalid form', () => {
    compileTheComponent({});
    component.taskForm.setValue({
      taskName: '',
      taskDescription: ''
    });
    expect(component.taskForm.valid).toEqual(false);
  });

  it('should test the valid form', () => {
    compileTheComponent({});
    component.taskForm.setValue({
      taskName: 'Task 1',
      taskDescription: 'Need to do task 1'
    });
    expect(component.taskForm.valid).toEqual(true);
  });

  it('should test the invalid form with task data is not received with MAT_DIALOG_DATA', () => {
    compileTheComponent({
      actionType: 'Update'
    });
    expect(component.taskForm.valid).toEqual(false);
  });

  it('should test the valid form with task data is received with MAT_DIALOG_DATA', () => {
    compileTheComponent({
      actionType: 'Update',
      task: {
        taskName: 'Task 1',
        taskDescription: 'Need to do task 1'
      }
    });
    expect(component.taskForm.valid).toEqual(true);
  });

  it('should test Add Task functionality', () => {
    let taskData = {
      taskName: 'Task 1',
      taskDescription: 'Need to do task 1'
    };
    compileTheComponent({
      actionType: 'Add',
      task: taskData
    });
    component.taskForm.setValue(taskData);
    let task = component.taskForm.value;
    component.addUpdateTask();
    expect(component.addUpdateTask).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(new TaskListAddAction({ task }));
  });

  it('should test Update Task functionality', () => {
    let taskData = {
      taskName: 'Task 1',
      taskDescription: 'Need to do task 1'
    };
    compileTheComponent({
      actionType: 'Update',
      task: { ...taskData, id: 1 }
    });
    component.taskForm.setValue(taskData);
    let task = { id: 1, ...component.taskForm.value };
    task['lastModified'] = Date.now();
    component.addUpdateTask();
    expect(component.addUpdateTask).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(new TaskListUpdateAction({ taskId: 1, task }));
  });
});
