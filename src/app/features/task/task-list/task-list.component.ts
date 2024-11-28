import { Component, inject , OnInit} from '@angular/core';
import { Task } from '../../../core';
import { Store } from '@ngrx/store';
import { getTask, selectAllTasks } from '../task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  private store = inject(Store);

  tasks$: Observable<Task[]> = new Observable<Task[]>();

  ngOnInit() {
    this.store.dispatch(getTask());
    this.tasks$ = this.store.select(selectAllTasks);
  }


}
