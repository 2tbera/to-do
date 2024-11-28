import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { getTask, getTaskSuccess } from '../';
import { LoaderService, TaskHttpService } from '../../../../core';

@Injectable()
export class TaskEffects {

    private actions$: Actions = inject(Actions);
    private taskHttpService: TaskHttpService = inject(TaskHttpService);
    private loaderService: LoaderService = inject(LoaderService);

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTask),
            tap(() => this.loaderService.setLoaderState(true)),
            mergeMap(() =>
                this.taskHttpService.getTasks().pipe(
                    tap(() => this.loaderService.setLoaderState(false)),
                    map(tasks => getTaskSuccess({ tasks })),
                    catchError(() => of({ type: '[Task API] Add Task Failed' }))
                )
            )
        ));
}