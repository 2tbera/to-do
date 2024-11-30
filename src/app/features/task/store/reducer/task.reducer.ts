import { Action,  createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { getTaskSuccess, editTaskStatusSuccess, filterChange, getTaskByidSuccess, deleteTaskSuccess, createTaskSuccess, editTaskSuccess } from '../';
import { FilterENUM, SortENUM, Task, TaskFilters } from '../../../../core';

export interface TaskState extends EntityState<Task> {
  filter: TaskFilters;
}

export const adapter = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
  filter: {
    filter: FilterENUM.All,
    sort: SortENUM.DueDate,
    searchTerm: ''
  }
});

const reducer = createReducer(
  initialState,
  on(getTaskSuccess, (state, { tasks }) => adapter.addMany(tasks, state)),
  on(getTaskByidSuccess, (state, { task }) => adapter.addOne(task, state)),
  on(createTaskSuccess, (state, { task }) => adapter.addOne(task, state)),
  on(editTaskSuccess, (state, { task }) => adapter.updateOne({ id: task.id, changes: task }, state)),
  on(editTaskStatusSuccess, (state, { task }) => adapter.updateOne({ id: task.id, changes: task }, state)),
  on(deleteTaskSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(filterChange, (state, { filter }) => {
    return {
      ...state,
      filter
    };
  }),
);

export function taskReducer(
  state = initialState,
  action: Action
) {
  return reducer(state, action);
}