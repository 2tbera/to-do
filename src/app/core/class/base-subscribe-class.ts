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
