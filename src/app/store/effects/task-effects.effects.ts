import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TASK_ADDED, TASK_DELETED, TASK_LIST_REQUEST, TASK_UPDATED, TaskListErrorAction, TaskListSuccessAction } from '../actions/task-action.actions';

@Injectable()
export class TaskEffects {

    loadTask$ = createEffect(() =>
        this.action$.pipe(
            ofType(TASK_LIST_REQUEST),
            exhaustMap(() => this.taskService.getTasks().pipe(
                map((tasks: Task | Task[]) => new TaskListSuccessAction({ data: tasks })),
                catchError(() => {
                    this.snackbar.open('Something went wrong!', 'cancel', { duration: 5000, panelClass: 'snack-error' });
                    return [new TaskListErrorAction()]
                })
            ))
        )
    );

    addTask$ = createEffect(() =>
        this.action$.pipe(
            ofType(TASK_ADDED),
            exhaustMap((payload: any) => this.taskService.addTask(payload.payload.task).pipe(
                map((tasks: Task) => {
                    this.snackbar.open('Task is added successfully', 'cancel', { duration: 5000 });
                    return new TaskListSuccessAction({ data: tasks })
                }),
                catchError(() => {
                    this.snackbar.open('Something went wrong!', 'cancel', { duration: 5000, panelClass: 'snack-error' });
                    return [new TaskListErrorAction()]
                })
            ))
        )
    );

    updateTask$ = createEffect(() =>
        this.action$.pipe(
            ofType(TASK_UPDATED),
            exhaustMap((payload: any) => this.taskService.updateTask(payload.payload.taskId, payload.payload.task).pipe(
                map((tasks: Task) => {
                    this.snackbar.open(`'Task Id - ${payload.payload.taskId}' is updated successfully`, 'cancel', { duration: 5000 });
                    return new TaskListSuccessAction({ data: tasks })
                }),
                catchError(() => {
                    this.snackbar.open('Something went wrong!', 'cancel', { duration: 5000, panelClass: 'snack-error' });
                    return [new TaskListErrorAction()]
                })
            ))
        )
    );

    deleteTask$ = createEffect(() =>
        this.action$.pipe(
            ofType(TASK_DELETED),
            exhaustMap((payload: any) => this.taskService.deleteTask(payload.payload.taskId).pipe(
                map((tasks: any) => {
                    this.snackbar.open(`'Task Id - ${payload.payload.taskId}' is deleted successfully`, 'cancel', { duration: 5000 });
                    return new TaskListSuccessAction({ data: tasks })
                }),
                catchError(() => {
                    this.snackbar.open('Something went wrong!', 'cancel', { duration: 5000, panelClass: 'snack-error' });
                    return [new TaskListErrorAction()]
                })
            ))
        )
    );

    constructor(
        private action$: Actions,
        public snackbar: MatSnackBar,
        private taskService: TaskService
    ) { }
}