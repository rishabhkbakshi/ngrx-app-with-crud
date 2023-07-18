import { OverlayModule } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatPackageModule } from '../../shared/modules/mat-package.module';
import { TaskListAddAction, TaskListDeleteAction, TaskListErrorAction, TaskListRequestAction, TaskListSuccessAction, TaskListUpdateAction } from '../actions/task-action.actions';
import { TaskReducer } from '../reducers/task-reducer.reducers';
import { TaskEffects } from './task-effects.effects';

describe('Task Effects', () => {
    let effects: TaskEffects;
    let metadata: EffectsMetadata<TaskEffects>;
    let actions: any;
    let mockTestApiService: any;

    beforeEach(() => {
        mockTestApiService = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask', 'updateTask', 'deleteTask']);

        TestBed.configureTestingModule({
            imports: [
                MatPackageModule,
                EffectsModule.forRoot([]),
                OverlayModule,
                RouterModule.forRoot([]),
                StoreModule.forRoot(TaskReducer),
                BrowserAnimationsModule
            ],
            providers: [
                TaskEffects,
                { provide: TaskService, useValue: mockTestApiService },
                provideMockActions(() => actions)
            ]
        });

        effects = TestBed.inject(TaskEffects);
        metadata = getEffectsMetadata(effects);
    });

    it('should call constructor', () => {
        expect(effects).toBeTruthy();
    });

    it('should register loadTask$ that dispatchs a TaskListSuccessAction action', () => {
        const taskData: Task = {
            taskName: 'Task 3',
            taskDescription: 'Need to do task 3',
            lastModified: '1688541525124',
            id: 3
        };
        const payload = {
            data: [taskData]
        };
        const data: Task[] = [taskData];
        mockTestApiService.getTasks.and.returnValue(of(data));
        const actionRequest = new TaskListRequestAction();
        const actionSuccess = new TaskListSuccessAction(payload);

        actions = cold('a', { a: actionRequest });
        const expected = cold('a', { a: actionSuccess });
        expect(effects.loadTask$).toBeObservable(expected);
    });

    it('should register loadTask$ that dispatchs a TaskListErrorAction action', () => {
        mockTestApiService.getTasks.and.returnValue(throwError(() => {
            return new Error('error')
        }));
        const actionRequest = new TaskListRequestAction();
        const actionError = new TaskListErrorAction();

        actions = cold('e', { e: actionRequest });
        const expected = cold('b', { b: actionError });
        expect(effects.loadTask$).toBeObservable(expected);
    });

    it('should register addTask$ that dispatchs a TaskListSuccessAction action', () => {
        const taskData: Task = {
            taskName: 'Task 6',
            taskDescription: 'Need to do task 6',
            lastModified: '1689593865208',
            id: 6
        };
        const addActionPayload = {
            task: taskData
        };
        const successActionPayload = {
            data: taskData
        };
        mockTestApiService.addTask.and.returnValue(of(taskData));
        const actionAdd = new TaskListAddAction(addActionPayload);
        const actionSuccess = new TaskListSuccessAction(successActionPayload);

        actions = cold('a', { a: actionAdd });
        const expected = cold('a', { a: actionSuccess });
        expect(effects.addTask$).toBeObservable(expected);
    });

    it('should register addTask$ that dispatchs a TaskListErrorAction action', () => {
        const taskData: Task = {
            taskName: 'Task 6',
            taskDescription: 'Need to do task 6',
            lastModified: '1689593865208',
            id: 6
        };
        const addActionPayload = {
            task: taskData
        };
        mockTestApiService.addTask.and.returnValue(throwError(() => {
            return new Error('error')
        }));
        const actionAdd = new TaskListAddAction(addActionPayload);
        const actionError = new TaskListErrorAction();

        actions = cold('e', { e: actionAdd });
        const expected = cold('b', { b: actionError });
        expect(effects.addTask$).toBeObservable(expected);
    });

    it('should register updateTask$ that dispatchs a TaskListSuccessAction action', () => {
        const taskData: Task = {
            taskName: 'Task 6 - Updated',
            taskDescription: 'Need to do task 6',
            lastModified: '1689593865208',
            id: 6
        };
        const updateActionPayload = {
            taskId: 6,
            task: taskData
        };
        const successActionPayload = {
            data: taskData
        };
        mockTestApiService.updateTask.and.returnValue(of(taskData));
        const actionUpdate = new TaskListUpdateAction(updateActionPayload);
        const actionSuccess = new TaskListSuccessAction(successActionPayload);

        actions = cold('a', { a: actionUpdate });
        const expected = cold('a', { a: actionSuccess });
        expect(effects.updateTask$).toBeObservable(expected);
    });

    it('should register updateTask$ that dispatchs a TaskListErrorAction action', () => {
        const taskData: Task = {
            taskName: 'Task 6 - Updated',
            taskDescription: 'Need to do task 6',
            lastModified: '1689593865208',
            id: 6
        };
        const updateActionPayload = {
            taskId: 6,
            task: taskData
        };
        mockTestApiService.updateTask.and.returnValue(throwError(() => {
            return new Error('error')
        }));
        const actionUpdate = new TaskListUpdateAction(updateActionPayload);
        const actionError = new TaskListErrorAction();

        actions = cold('e', { e: actionUpdate });
        const expected = cold('b', { b: actionError });
        expect(effects.updateTask$).toBeObservable(expected);
    });

    it('should register deleteTask$ that dispatchs a TaskListSuccessAction action', () => {
        const taskData: Task = {
            taskName: 'Task 6',
            taskDescription: 'Need to do task 6',
            lastModified: '1689593865208',
            id: 6
        };
        const deleteActionPayload = {
            taskId: 6
        };
        const successActionPayload = {
            data: taskData
        };
        mockTestApiService.deleteTask.and.returnValue(of(taskData));
        const actionDelete = new TaskListDeleteAction(deleteActionPayload);
        const actionSuccess = new TaskListSuccessAction(successActionPayload);

        actions = cold('a', { a: actionDelete });
        const expected = cold('a', { a: actionSuccess });
        expect(effects.deleteTask$).toBeObservable(expected);
    });

    it('should register deleteTask$ that dispatchs a TaskListErrorAction action', () => {
        const deleteActionPayload = {
            taskId: 6
        };
        mockTestApiService.deleteTask.and.returnValue(throwError(() => {
            return new Error('error')
        }));
        const actionDelete = new TaskListDeleteAction(deleteActionPayload);
        const actionError = new TaskListErrorAction();

        actions = cold('e', { e: actionDelete });
        const expected = cold('b', { b: actionError });
        expect(effects.deleteTask$).toBeObservable(expected);
    });
})