import { createAction, props } from '@ngrx/store';
import { Task, TaskFilters } from '../../../../core';

/**
 * Action to get all tasks.
 */
export const getTask = createAction('[Task] Get Tasks');

/**
 * Action dispatched when tasks are successfully retrieved.
 * 
 * @param tasks - Array of tasks retrieved.
 */
export const getTaskSuccess = createAction(
  '[Task] Get Task Success',
  props<{ tasks: Task[] }>()
);

/**
 * Action dispatched when there is an error retrieving tasks.
 * 
 * @param error - Error object containing details of the failure.
 */
export const getTaskFailure = createAction(
  '[Task] Get Task Failure',
  props<{ error: Error }>()
);

/**
 * Action to get a task by its ID.
 * 
 * @param id - ID of the task to retrieve.
 */
export const getTaskByid = createAction('[Task] Get Tasks By Id',
  props<{ id: number }>());

/**
 * Action dispatched when a task is successfully retrieved by ID.
 * 
 * @param task - The task retrieved by ID.
 */
export const getTaskByidSuccess = createAction(
  '[Task] Get Task By Id Success',
  props<{ task: Task }>()
);

/**
 * Action dispatched when there is an error retrieving a task by ID.
 * 
 * @param error - Error object containing details of the failure.
 */
export const getTaskByidFailure = createAction(
  '[Task] Get Task By Id Failure',
  props<{ error: Error }>()
);

/**
 * Action to edit the status of a task.
 * 
 * @param id - ID of the task to edit.
 * @param status - New status of the task.
 */
export const editTaskStatus = createAction(
  '[Task] Edit Task Status',
  props<{ id: number, status: boolean }>()
);

/**
 * Action dispatched when a task's status is successfully edited.
 * 
 * @param task - The task with the updated status.
 */
export const editTaskStatusSuccess = createAction(
  '[Task] Edit Task Status Success',
  props<{ task: Task }>()
);

/**
 * Action dispatched when there is an error editing a task's status.
 * 
 * @param error - Error object containing details of the failure.
 */
export const editTaskStatusFailure = createAction(
  '[Task] Edit Task Status Failure',
  props<{ error: Error }>()
);

/**
 * Action to delete a task.
 * 
 * @param id - ID of the task to delete.
 */
export const deleteTask = createAction('[Task] Delete Tasks',
  props<{ id: number }>());

/**
 * Action dispatched when a task is successfully deleted.
 * 
 * @param id - ID of the deleted task.
 */
export const deleteTaskSuccess = createAction(
  '[Task] Delete Tasks Success',
  props<{ id: number }>()
);

/**
 * Action dispatched when there is an error deleting a task.
 * 
 * @param error - Error object containing details of the failure.
 */
export const deleteTaskFailure = createAction(
  '[Task] Delete Tasks Failure',
  props<{ error: Error }>()
);

/**
 * Action to create a new task.
 * 
 * @param task - The task to create.
 */
export const createTask = createAction('[Task] Create Tasks',
  props<{ task: Task }>());

/**
 * Action dispatched when a task is successfully created.
 * 
 * @param task - The newly created task.
 */
export const createTaskSuccess = createAction(
  '[Task] Create Tasks Success',
  props<{ task: Task }>()
);

/**
 * Action dispatched when there is an error creating a task.
 * 
 * @param error - Error object containing details of the failure.
 */
export const createTaskFailure = createAction(
  '[Task] Create Tasks Failure',
  props<{ error: Error }>()
);

/**
 * Action to edit an existing task.
 * 
 * @param id - ID of the task to edit.
 * @param task - The updated task object.
 */
export const editTask = createAction('[Task] Edit Tasks',
  props<{ id: number, task: Task }>());

/**
 * Action dispatched when a task is successfully edited.
 * 
 * @param task - The updated task object.
 */
export const editTaskSuccess = createAction(
  '[Task] Edit Tasks Success',
  props<{ task: Task }>()
);

/**
 * Action dispatched when there is an error editing a task.
 * 
 * @param error - Error object containing details of the failure.
 */
export const editTaskFailure = createAction(
  '[Task] Edit Tasks Failure',
  props<{ error: Error }>()
);

/**
 * Action to change the task filters.
 * 
 * @param filter - The new task filters.
 */
export const filterChange = createAction(
  '[Task] Filter Change',
  props<{ filter: TaskFilters }>()
);
