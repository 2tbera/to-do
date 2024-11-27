import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getTask, getTaskSuccess } from '../';
import { TaskHttpService } from '../../../../core';

@Injectable()
export class TaskEffects {

    private actions$: Actions = inject(Actions);
    private taskHttpService: TaskHttpService = inject(TaskHttpService);

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTask),
            mergeMap(action =>
                this.taskHttpService.getTasks().pipe(
                    map(tasks => getTaskSuccess({ tasks })),
                    catchError(() => of({ type: '[Task API] Add Task Failed' }))
                )
            )
        ));
}