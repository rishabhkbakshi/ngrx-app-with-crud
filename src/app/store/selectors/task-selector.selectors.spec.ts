import { TaskReducerState } from '../reducers/task-reducer.reducers';
import { getActionError, getActionLoaded, getActionLoading, getActionTasks } from './task-selector.selectors';

describe('Task Selectors', () => {

    const taskState: TaskReducerState = {
        tasks: [],
        error: false,
        loading: false,
        loaded: false
    }

    it('should have getActionTasks', () => {
        const selector = getActionTasks;
        expect(selector.projector(taskState)).toEqual(taskState.tasks);
    });

    it('should have getLoading', () => {
        const selector = getActionLoading;
        expect(selector.projector(taskState)).toEqual(taskState.loading);
    });

    it('should have getLoaded', () => {
        const selector = getActionLoaded;
        expect(selector.projector(taskState)).toEqual(taskState.loaded);
    });

    it('should have getError', () => {
        const selector = getActionError;
        expect(selector.projector(taskState)).toEqual(taskState.error);
    });
})