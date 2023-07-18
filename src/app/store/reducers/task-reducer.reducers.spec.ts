import { TaskListAddAction, TaskListDeleteAction, TaskListErrorAction, TaskListRequestAction, TaskListSuccessAction, TaskListUpdateAction } from '../actions/task-action.actions';
import { TASK_INITIAL_STATE, TaskReducer } from './task-reducer.reducers';

describe('Task Reducers', () => {

    it('should have state for no action', () => {
        const action = { type: '' };
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeFalsy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(0);
    });

    it('should have state for action TaskRequestAction', () => {
        const action = new TaskListRequestAction();
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeTruthy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(0);
    });

    it('should have state for Task-Reducer don\'t have state and calling TaskRequestAction', () => {
        const action = new TaskListRequestAction();
        const state = TaskReducer(undefined, action);
        expect(state.loading).toBeTruthy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(0);
    });

    it('should have state for action TaskAddedAction when TASK_Array is empty in the state', () => {
        const payload = {
            task: {
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }
        };
        const action = new TaskListAddAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeTruthy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(1);
    });

    it('should have state for action TaskAddedAction when TASK_Array is not empty in the state', () => {
        const payload = {
            task: {
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }
        };
        TASK_INITIAL_STATE.tasks = [{
            id: 5,
            taskName: 'Task 5',
            taskDescription: 'Need to do task 5',
            lastModified: '1688541525124'
        }]
        const action = new TaskListAddAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeTruthy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(2);
        TASK_INITIAL_STATE.tasks = [];
    });

    it('should have state for action TaskUpdateAction', () => {
        const payload = {
            taskId: 3,
            task: {
                id: 3,
                taskName: 'Task 3 - Updated',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }
        };
        const action = new TaskListUpdateAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeTruthy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(1);
        expect(state.tasks[0].taskName).toBe('Task 3 - Updated');
    });

    it('should have state for action TaskUpdateAction when multiple tasks are added in the TASK_Array', () => {
        const payload = {
            taskId: 3,
            task: {
                id: 3,
                taskName: 'Task 3 - Updated',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }
        };
        TASK_INITIAL_STATE.tasks = [{
            id: 5,
            taskName: 'Task 5',
            taskDescription: 'Need to do task 5',
            lastModified: '1688541525124'
        }]
        const action = new TaskListUpdateAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeTruthy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(2);
        expect(state.tasks[0].taskName).toBe('Task 3 - Updated');
        TASK_INITIAL_STATE.tasks = [];
    });

    it('should have state for action TaskDeleteAction', () => {
        const payload = {
            taskId: 3
        };
        TASK_INITIAL_STATE.tasks = [{
            id: 3,
            taskName: 'Task 3',
            taskDescription: 'Need to do task 3',
            lastModified: '1688541525124'
        }, {
            id: 5,
            taskName: 'Task 5',
            taskDescription: 'Need to do task 5',
            lastModified: '1688541525124'
        }]
        const action = new TaskListDeleteAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeTruthy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(1);
        TASK_INITIAL_STATE.tasks = [];
    });

    it('should have state when api call gets any error', () => {
        const action = new TaskListErrorAction();
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeFalsy();
        expect(state.error).toBeTruthy();
        expect(state.loaded).toBeFalsy();
        expect(state.tasks.length).toBe(0);
    });

    it('should have state for action TaskSuccessAction when payload having TASK_Array', () => {
        const payload = {
            data: [{
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }, {
                id: 5,
                taskName: 'Task 5',
                taskDescription: 'Need to do task 5',
                lastModified: '1688541525124'
            }]
        };
        const action = new TaskListSuccessAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeFalsy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeTruthy();
        expect(state.tasks.length).toBe(2);
        TASK_INITIAL_STATE.tasks = [];
    });

    it('should have state for action TaskSuccessAction when payload having task object', () => {
        const payload = {
            data: {
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }
        };
        TASK_INITIAL_STATE.tasks = [{
            id: 2,
            taskName: 'Task 2',
            taskDescription: 'Need to do task 2',
            lastModified: '1688541525124'
        }]
        const action = new TaskListSuccessAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeFalsy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeTruthy();
        expect(state.tasks.length).toBe(1);
        TASK_INITIAL_STATE.tasks = [];
    });

    it('should have state for action TaskSuccessAction when accidently api call gets some error and user click on \'Please Refresh\' Button', () => {
        const payload = {
            data: [{
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }]
        };
        TASK_INITIAL_STATE.tasks = [{
            id: 2,
            taskName: 'Task 2',
            taskDescription: 'Need to do task 2',
            lastModified: '1688541525124'
        }, {
            id: 3,
            taskName: 'Task 3',
            taskDescription: 'Need to do task 3',
            lastModified: '1688541525124'
        }]
        const action = new TaskListSuccessAction(payload);
        const state = TaskReducer(TASK_INITIAL_STATE, action);
        expect(state.loading).toBeFalsy();
        expect(state.error).toBeFalsy();
        expect(state.loaded).toBeTruthy();
        expect(state.tasks.length).toBe(1);
        TASK_INITIAL_STATE.tasks = [];
    });
});