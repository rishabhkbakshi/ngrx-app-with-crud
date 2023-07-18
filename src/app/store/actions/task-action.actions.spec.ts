import { TASK_ADDED, TASK_DELETED, TASK_LIST_ERROR, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_UPDATED, TaskListAddAction, TaskListDeleteAction, TaskListErrorAction, TaskListRequestAction, TaskListSuccessAction, TaskListUpdateAction } from './task-action.actions';

describe('Task Actions', () => {

    it('should create task request action', () => {
        const action = new TaskListRequestAction();
        expect(action.type).toEqual(TASK_LIST_REQUEST);
    });

    it('should create task success action', () => {
        const payload = {
            data: [{
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task3',
                lastModified: '1688541525124'
            }]
        }
        const action = new TaskListSuccessAction(payload);
        expect(action.type).toEqual(TASK_LIST_SUCCESS);
    });

    it('should create task error action', () => {
        const action = new TaskListErrorAction();
        expect(action.type).toEqual(TASK_LIST_ERROR);
    });

    it('should create an add task action', () => {
        const payload = {
            task: {
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }
        }
        const action = new TaskListAddAction(payload);
        expect(action.type).toEqual(TASK_ADDED);
    });

    it('should create an update task action', () => {
        const payload = {
            taskId: 3,
            task: {
                id: 3,
                taskName: 'Task 3',
                taskDescription: 'Need to do task 3',
                lastModified: '1688541525124'
            }
        }
        const action = new TaskListUpdateAction(payload);
        expect(action.type).toEqual(TASK_UPDATED);
    });

    it('should create a delete task action', () => {
        const payload = {
            taskId: 2
        }
        const action = new TaskListDeleteAction(payload);
        expect(action.type).toEqual(TASK_DELETED);
    });
})