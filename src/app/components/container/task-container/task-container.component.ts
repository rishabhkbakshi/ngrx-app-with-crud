import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, take } from 'rxjs';
import { Task } from '../../../models/task';
import { TIME_ZONE, timeZones } from '../../../shared/constent';
import { TaskListRequestAction } from '../../../store/actions/task-action.actions';
import { RootReducerState } from '../../../store/reducers';
import { getActionError, getActionLoaded, getActionLoading, getActionTasks } from '../../../store/selectors/task-selector.selectors';
import { AddUpdateTaskDialogComponent } from '../../modal-popups/add-update-task-dialog/add-update-task-dialog.component';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit {

  taskList: Task[] = [];
  error: boolean = false;
  loading: boolean = false;
  loaded: boolean = false;
  timeZones: TIME_ZONE[] = timeZones;
  timeZoneForm = this.fb.group({
    timezone: [1]
  });
  timeZone: string = this.timeZones[0].zone;

  constructor(
    public store: Store<RootReducerState>,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchAllTasks();
    this.selectionChange(this.timeZone);
  }

  fetchAllTasks(force: boolean = false) {
    const getTaskList$ = this.store.select(getActionTasks);
    const getTaskLoading$ = this.store.select(getActionLoading);
    const getTaskLoaded$ = this.store.select(getActionLoaded);
    const getError$ = this.store.select(getActionError);
    combineLatest([getTaskLoaded$, getTaskLoading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new TaskListRequestAction());
      }
    });
    getTaskLoading$.subscribe((data) => {
      this.loading = data;
    });
    getTaskList$.subscribe((data) => {
      this.taskList = data;
    });
    getTaskLoaded$.subscribe((data) => {
      this.loaded = data;
    });
    getError$.subscribe((data) => {
      this.error = data;
    });
  }

  refreshCall() {
    this.fetchAllTasks(true);
  }

  addTask(type: string) {
    let dialogRef = this.dialog.open(AddUpdateTaskDialogComponent, {
      width: '300px',
      disableClose: true,
      data: {
        actionType: type,
        task: undefined
      }
    });
    dialogRef.afterClosed().subscribe(() => { });
  }

  selectionChange(localeString: string) {
    this.timeZone = localeString;
  }

  get showContent(): boolean {
    return (!this.loading && this.loaded);
  }

  get timeZoneClass(): string {
    return this.taskList.length > 0 ? 'col-sm-7 d-flex justify-content-end' : 'col-sm-12 justify-content-between';
  }

}
