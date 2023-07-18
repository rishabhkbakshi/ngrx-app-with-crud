import { ActionReducerMap } from '@ngrx/store/src';
import * as fromTask from './task-reducer.reducers';

export interface RootReducerState {
    tasks: fromTask.TaskReducerState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    tasks: fromTask.TaskReducer
}

export const getTaskState = (state: RootReducerState) => state.tasks;