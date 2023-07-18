import { createSelector } from '@ngrx/store';
import { getTaskState } from '../reducers';
import { TaskReducerState } from '../reducers/task-reducer.reducers';

export const getActionTasks = createSelector(getTaskState, (state: TaskReducerState) => state.tasks);
export const getActionError = createSelector(getTaskState, (state: TaskReducerState) => state.error);
export const getActionLoading = createSelector(getTaskState, (state: TaskReducerState) => state.loading);
export const getActionLoaded = createSelector(getTaskState, (state: TaskReducerState) => state.loaded);

