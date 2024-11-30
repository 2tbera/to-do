import { createAction, props } from '@ngrx/store';
import { Task, TaskFilters } from '../../../../core';

// 

export const getTask = createAction('[Task] Get Tasks');

export const getTaskSuccess = createAction(
  '[Task] Get Task Success',
  props<{ tasks: Task[] }>()
);

export const getTaskFailure = createAction(
  '[Task] Get Task Failure',
  props<{ error: Error }>()
);

// 

export const getTaskByid = createAction('[Task] Get Tasks By Id',
  props<{ id: number}>());

export const getTaskByidSuccess = createAction(
  '[Task] Get Task By Id Success',
  props<{ task: Task }>()
);

export const getTaskByidFailure = createAction(
  '[Task] Get Task By Id Failure',
  props<{ error: Error }>()
);

// 

export const editTaskStatus = createAction(
  '[Task] Edit Task Status',
  props<{ id: number, status: boolean }>()
);

export const editTaskStatusSuccess = createAction(
  '[Task] Edit Task Status Success',
  props<{ task: Task }>()
);

export const editTaskStatusFailure = createAction(
  '[Task] Edit Task Status Failure',
  props<{ error: Error }>()
);

// 

export const deleteTask = createAction('[Task] Delete Tasks',
  props<{ id: number}>());

export const deleteTaskSuccess = createAction(
  '[Task] Delete Tasks Success',
  props<{ id: number }>()
);

export const deleteTaskFailure = createAction(
  '[Task] Delete Tasks Failure',
  props<{ error: Error }>()
);

// 


// 

export const createTask = createAction('[Task] Create Tasks',
  props<{ task: Task}>());

export const createTaskSuccess = createAction(
  '[Task] Create Tasks Success',
  props<{ task: Task }>()
);

export const createTaskFailure = createAction(
  '[Task] Create Tasks Failure',
  props<{ error: Error }>()
);

// 


// 

export const editTask = createAction('[Task] Edit Tasks',
  props<{id: number, task: Task}>());

export const editTaskSuccess = createAction(
  '[Task] Edit Tasks Success',
  props<{ task: Task }>()
);

export const editTaskFailure = createAction(
  '[Task] Edit Tasks Failure',
  props<{ error: Error }>()
);

// 

export const filterChange = createAction(
  '[Task] Filter Change',
  props<{ filter: TaskFilters }>()
);

// 