import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { addTask, editTask, deleteTask, getTaskSuccess } from '../';
import { Task } from '../../../../core';

export interface TaskState extends EntityState<Task> {}

export const adapter = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(getTaskSuccess, (state, { tasks }) => adapter.addMany(tasks, state)),
  on(editTask, (state, { task }) => adapter.updateOne({ id: task.id, changes: task }, state)),
  on(deleteTask, (state, { id }) => adapter.removeOne(id, state)),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export function taskReducer(
  state = initialState,
  action: Action
) {
  return reducer(state, action);
}


// Select the feature state
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Use the adapter's selectAll method to get an array of all tasks
export const selectAllTasks = createSelector(
  selectTaskState,
  adapter.getSelectors().selectAll
);