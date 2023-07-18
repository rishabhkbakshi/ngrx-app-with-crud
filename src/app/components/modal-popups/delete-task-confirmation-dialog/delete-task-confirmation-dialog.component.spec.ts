import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { TaskListDeleteAction } from 'src/app/store/actions/task-action.actions';
import { MatPackageModule } from '../../../shared/modules/mat-package.module';
import * as fromTask from '../../../store/reducers';
import { DeleteTaskConfirmationDialogComponent } from './delete-task-confirmation-dialog.component';

describe('DeleteTaskConfirmationDialogComponent', () => {
  let component: DeleteTaskConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteTaskConfirmationDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  }
  let store: Store<fromTask.RootReducerState>;

  // seprate method to override MAT_DIALOG_DATA when modal-popup open in the test case
  const compileTheComponent = (useValue: any) => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DeleteTaskConfirmationDialogComponent);
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
        StoreModule.forRoot(fromTask.rootReducer),
        MatPackageModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            index: undefined,
            buttonText: undefined
          }
        }
      ],
      declarations: [DeleteTaskConfirmationDialogComponent]
    })
  });


  it('should create', () => {
    compileTheComponent({});
    expect(component).toBeTruthy();
  });

  it('should test the button text of OK and CANCEL when text is not sending with popup open statement', () => {
    compileTheComponent({
      index: 1,
      buttonText: {
        ok: 'Yes',
        cancel: 'Cancel'
      }
    });
    expect(component.confirmButtonText).toBe('Yes');
    expect(component.cancelButtonText).toBe('Cancel');
  });

  it('should test the button text of OK and CANCEL when text is sending with popup open statement', () => {
    compileTheComponent({
      index: 1,
      buttonText: {}
    });
    expect(component.confirmButtonText).toBe('Yes');
    expect(component.cancelButtonText).toBe('Cancel');
  });

  it('should test the button popup message when text is sending with popup open statement', () => {
    compileTheComponent({
      index: 1,
      message: 'Are you sure you want to delete this record ?'
    });
    expect(component.message).toBe('Are you sure you want to delete this record ?');
  });

  it('should test the button popup message when text is not sending with popup open statement', () => {
    compileTheComponent({
      index: 1
    });
    expect(component.message).toBe('Are you sure ?');
  });

  it('should test the delete the task functionality', () => {
    compileTheComponent({
      index: 1
    });
    component.onConfirmClick();
    expect(component.onConfirmClick).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(new TaskListDeleteAction({ taskId: 1 }));
  });
});
