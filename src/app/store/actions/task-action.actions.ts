import { Task } from '../../models/task';

export const TASK_LIST_REQUEST = 'task list request';
export const TASK_LIST_SUCCESS = 'task list success';
export const TASK_LIST_ERROR = 'task list error';
export const TASK_ADDED = 'task added';
export const TASK_UPDATED = 'task updated';
export const TASK_DELETED = 'task deleted';

export class TaskListRequestAction {
    readonly type = TASK_LIST_REQUEST

}

export class TaskListErrorAction {
    readonly type = TASK_LIST_ERROR
}

export class TaskListAddAction {
    readonly type = TASK_ADDED

    constructor(public payload?: { task: Task }) {

    }
}

export class TaskListUpdateAction {
    readonly type = TASK_UPDATED

    constructor(public payload?: { taskId: number, task: Task }) {

    }
}

export class TaskListDeleteAction {
    readonly type = TASK_DELETED

    constructor(public payload?: { taskId: number }) {

    }
}

export class TaskListSuccessAction {
    readonly type = TASK_LIST_SUCCESS

    // constructor(public payload?: { data: Task[] }) {
    constructor(public payload?: { data: Task[] | Task }) {

    }
}


