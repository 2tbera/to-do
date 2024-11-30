/**
 * BaseSubscribeClass is an abstract class that implements the OnDestroy lifecycle hook.
 * It provides a Subject called `destroy$` which can be used to signal the destruction
 * of the component and clean up subscriptions to avoid memory leaks.
 *
 * @example
 * ```typescript
 * export class MyComponent extends BaseSubscribeClass {
 *   constructor() {
 *     super();
 *     someObservable.pipe(takeUntil(this.destroy$)).subscribe();
 *   }
 * }
 * ```
 *
 * @implements {OnDestroy}
 */
import {Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseSubscribeClass implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
