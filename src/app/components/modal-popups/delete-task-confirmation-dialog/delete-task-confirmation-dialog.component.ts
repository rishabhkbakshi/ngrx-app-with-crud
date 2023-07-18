import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskListDeleteAction } from '../../../store/actions/task-action.actions';
import { RootReducerState } from '../../../store/reducers';

@Component({
  selector: 'app-delete-task-confirmation-dialog',
  templateUrl: './delete-task-confirmation-dialog.component.html',
  styleUrls: ['./delete-task-confirmation-dialog.component.scss']
})
export class DeleteTaskConfirmationDialogComponent implements OnInit {

  message: string = 'Are you sure ?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteTaskConfirmationDialogComponent>,
    public store: Store<RootReducerState>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    const taskId: number = this.data.index;
    this.store.dispatch(new TaskListDeleteAction({ taskId }));
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close()
  }

}
