import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
    createTask,
    createTaskFailure,
    createTaskSuccess,
    deleteTask,
    deleteTaskFailure,
    deleteTaskSuccess,
    editTask,
    editTaskFailure,
    editTaskStatus,
    editTaskStatusFailure,
    editTaskStatusSuccess,
    editTaskSuccess,
    filterChange,
    getTask,
    getTaskByid,
    getTaskByidFailure,
    getTaskByidSuccess,
    getTaskFailure,
    getTaskSuccess
} from '../';
import { LoaderService, TaskHttpService } from '../../../../core';

@Injectable()
export class TaskEffects {

    private actions$: Actions = inject(Actions);
    private taskHttpService: TaskHttpService = inject(TaskHttpService);
    private loaderService: LoaderService = inject(LoaderService);
    private router: Router = inject(Router);

    /**
     * Effect to handle filter change actions.
     * 
     * This effect listens for the `filterChange` action and performs the following:
     * - Sets the loader state to true.
     * - Navigates to the current route with the new filter query parameters.
     */
    filterChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(filterChange),
            tap(() => this.loaderService.setLoaderState(true)),
            tap(({ filter }) => {
                this.router.navigate([], {
                    queryParams: filter
                });
                this.loaderService.setLoaderState(false)
            })
        ), { dispatch: false });


    /**
     * Effect to handle the `getTask` action.
     * 
     * This effect listens for the `getTask` action and performs the following:
     * - Calls the `getTasks` method of `TaskHttpService` to fetch tasks.
     * - On success, dispatches the `getTaskSuccess` action with the fetched tasks.
     * - On failure, dispatches the `getTaskFailure` action with the error.
     */
    getTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTask),
            tap(() => this.loaderService.setLoaderState(true)),
            mergeMap(() =>
                this.taskHttpService.getTasks().pipe(
                    tap(() => this.loaderService.setLoaderState(false)),
                    map(tasks => getTaskSuccess({ tasks })),
                    tap(() => this.loaderService.setLoaderState(false)),
                    catchError((error: Error) => of(getTaskFailure({ error })))
                )
            )
        ));

    /**
     * Effect to handle the `getTaskById` action.
     * 
     * This effect listens for the `getTaskById` action and performs the following:
     * - Calls the `getTaskById` method of `TaskHttpService` to fetch a task by its ID.
     * - On success, dispatches the `getTaskByIdSuccess` action with the fetched task.
     * - On failure, dispatches the `getTaskByIdFailure` action with the error.
     */
    getTaskById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTaskByid),
            tap(() => this.loaderService.setLoaderState(true)),
            mergeMap((actions) =>
                this.taskHttpService.getTaskById(actions.id).pipe(
                    tap(() => this.loaderService.setLoaderState(false)),
                    map(task => getTaskByidSuccess({ task })),
                    tap(() => this.loaderService.setLoaderState(false)),
                    catchError((error: Error) => of(getTaskByidFailure({ error })))
                )
            )
        ));

    /**
     * Effect to handle the creation of a task.
     * 
     * This effect listens for the `createTask` action and makes an HTTP request to create a task using the `taskHttpService`.
     * Once the task is successfully created,
     * it dispatches the `createTaskSuccess` action with the created task. If there is an error during the task creation,
     * it catches the error and dispatches the `createTaskFailure` action with the error.
     */
    createTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTask),
            tap(() => this.loaderService.setLoaderState(true)),
            mergeMap((actions) =>
                this.taskHttpService.createTask(actions.task).pipe(
                    tap(() => this.loaderService.setLoaderState(false)),
                    map(task => createTaskSuccess({ task })),
                    catchError((error: Error) => of(createTaskFailure({ error })))
                )
            )
        ));

    /**
     * Effect to handle the editing of a task.
     * 
     * This effect listens for the `editTask` action and makes an HTTP request to edit a task using the `taskHttpService`.
     * Once the task is successfully edited,
     * it dispatches the `editTaskSuccess` action with the edited task. If there is an error during the task editing,
     * it catches the error and dispatches the `editTaskFailure` action with the error.
     */
    editTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editTask),
            tap(() => this.loaderService.setLoaderState(true)),
            mergeMap((actions) =>
                this.taskHttpService.editTask(actions.id, actions.task).pipe(
                    tap(() => this.loaderService.setLoaderState(false)),
                    map(task => editTaskSuccess({ task })),
                    catchError((error: Error) => of(editTaskFailure({ error })))
                )
            )
        ));



    /**
     * Effect to handle the editing of a task's status.
     * 
     * This effect listens for the `editTaskStatus` action
     * and then makes an HTTP request to edit the task's status. Upon success, it dispatches
     * the `editTaskStatusSuccess` action with the updated task. If an error occurs, it dispatches
     * the `editTaskStatusFailure` action with the error.
     */
    editTaskStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editTaskStatus),
            tap(() => this.loaderService.setLoaderState(true)),
            mergeMap((actions) =>
                this.taskHttpService.editTaskStatus(actions.id, actions.status).pipe(
                    tap(() => this.loaderService.setLoaderState(false)),
                    map(task => editTaskStatusSuccess({ task })),
                    catchError((error: Error) => of(editTaskStatusFailure({ error })))
                )
            )
        ));

    /**
     * Effect to handle the deletion of a task.
     * 
     * This effect listens for the `deleteTask` action and performs the following:
     * - Calls the `deleteTask` method of `TaskHttpService` to delete the task by its ID.
     * - On success, dispatches the `deleteTaskSuccess` action with the deleted task's ID.
     * - Navigates to the root route.
     * - On failure, dispatches the `deleteTaskFailure` action with the error.
     */
    deleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTask),
            tap(() => this.loaderService.setLoaderState(true)),
            mergeMap((actions) =>
                this.taskHttpService.deleteTask(actions.id).pipe(
                    tap(() => this.loaderService.setLoaderState(false)),
                    map(id => deleteTaskSuccess(id)),
                    tap(() => this.router.navigate(['/'])),
                    catchError((error: Error) => of(deleteTaskFailure({ error })))
                )
            )
        ));
}