import { Task } from '../../models/task';
import { Action } from '../actions';
import { TASK_ADDED, TASK_DELETED, TASK_LIST_ERROR, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_UPDATED } from '../actions/task-action.actions';

export interface TaskReducerState {
    tasks: Task[],
    error: boolean,
    loading: boolean,
    loaded: boolean
}


export const TASK_INITIAL_STATE: TaskReducerState = {
    tasks: [],
    error: false,
    loading: false,
    loaded: false
}

export function TaskReducer(state = TASK_INITIAL_STATE, action: Action): TaskReducerState {
    switch (action.type) {
        case TASK_LIST_REQUEST: {
            return { ...state, loading: true };
        }
        case TASK_ADDED: {
            // for testing purpose (spec.ts)
            delete action.payload.task.id;
            const tasks = state.tasks;
            let taskAfterAdding = tasks.concat(action.payload.task);
            let lastElem = taskAfterAdding[taskAfterAdding.length - 1];
            let idOfLastElem = (taskAfterAdding.length === 1 ? 1 : Math.max(...tasks.map(elem => elem.id)) + 1);
            lastElem = { ...lastElem, id: idOfLastElem };
            taskAfterAdding = taskAfterAdding.concat(lastElem).filter(data => data.id);
            return { ...state, ...{ tasks: taskAfterAdding }, error: false, loading: true };
        }
        case TASK_UPDATED: {
            const tasks = state.tasks.filter(data => data.id !== action.payload.taskId);
            const updatedTasks = tasks.concat(action.payload.task);
            updatedTasks.sort((a, b) => a.id - b.id);
            return { ...state, ...{ tasks: updatedTasks }, error: false, loading: true };
        }
        case TASK_DELETED: {
            const tasks = state.tasks.filter(data => data.id !== action.payload.taskId);
            return { ...state, ...{ tasks }, error: false, loading: true, loaded: false };
        }
        case TASK_LIST_ERROR: {
            return { ...state, error: true, loading: false };
        }
        case TASK_LIST_SUCCESS: {
            // check whether the type of variable is object or not
            const isObj = (o: any) => o?.constructor === Object;

            const diff = state.tasks.length - (isObj(action.payload.data) ? 0 : action.payload.data.length);
            if (Array.isArray(action.payload.data)) {
                const updatedTasks = [...new Map(state.tasks.concat(action.payload.data).map(item => [item['id'], item])).values()];
                if (diff === 1) {
                    updatedTasks.pop();
                }
                updatedTasks.sort((a, b) => a.id - b.id);
                return { ...state, tasks: updatedTasks, error: false, loading: false, loaded: true };
            }
            return { ...state, error: false, loading: false, loaded: true };
        }
        default: {
            return state;
        }
    }
};