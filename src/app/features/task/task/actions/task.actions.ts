import { createAction, props } from '@ngrx/store';
import { Task } from '../../../../core';

export const getTask = createAction('[Task] Get Tasks');

export const getTaskSuccess = createAction(
  '[Task] Get Task Success',
  props<{ tasks: Task[] }>()
);

export const getTaskFailure = createAction(
  '[Task] Get Task Failure',
  props<{ error: any }>()
);


export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>()
);

export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
  props<{ error: any }>()
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ task: Task }>()
);

export const editTaskSuccess = createAction(
  '[Task] Edit Task Success',
  props<{ task: Task }>()
);

export const editTaskFailure = createAction(
  '[Task] Edit Task Failure',
  props<{ error: any }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);

export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: any }>()
);