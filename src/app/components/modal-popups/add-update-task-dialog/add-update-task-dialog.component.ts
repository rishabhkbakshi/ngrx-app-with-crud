import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskListAddAction, TaskListUpdateAction } from '../../../store/actions/task-action.actions';
import { RootReducerState } from '../../../store/reducers';

@Component({
  selector: 'app-add-update-task-dialog',
  templateUrl: './add-update-task-dialog.component.html',
  styleUrls: ['./add-update-task-dialog.component.scss']
})
export class AddUpdateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;
  crudType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<RootReducerState>
  ) {
    this.crudType = data.actionType;
    this.taskForm = this.formBuilder.group({
      taskName: [data.task ? data.task.taskName : '', Validators.compose([Validators.required])],
      taskDescription: [data.task ? data.task.taskDescription : '', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  addUpdateTask() {
    if (this.taskForm.valid) {
      if (this.crudType === 'Add') {
        let task = this.taskForm.value;
        task['lastModified'] = Date.now();
        this.store.dispatch(new TaskListAddAction({ task }));
      } else {
        let task = { id: this.data.task.id, ...this.taskForm.value };
        task['lastModified'] = Date.now();
        this.store.dispatch(new TaskListUpdateAction({ taskId: task.id, task }));
      }
    }
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
