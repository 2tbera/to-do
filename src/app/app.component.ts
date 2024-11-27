import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTask } from './features/task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'to-do-etoro';
  constructor(private store: Store) {
    setTimeout(() => {
      this.store.dispatch(getTask());
    }, 2000);
  }
}
