import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
import { Router } from '@angular/router';

@Injectable()
export class TaskEffects {

    private actions$: Actions = inject(Actions);
    private taskHttpService: TaskHttpService = inject(TaskHttpService);
    private loaderService: LoaderService = inject(LoaderService);

    private router: Router = inject(Router);

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