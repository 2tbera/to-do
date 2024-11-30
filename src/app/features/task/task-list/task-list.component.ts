import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { editTaskStatus, filterChange, getTask, selectSortedTasks, selectTaskFilters } from '../store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task, TaskFilters } from '../../../core';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable<Task[]>();
  taskFilters$: Observable<TaskFilters> = new Observable<TaskFilters>();

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit() {
    this.store.dispatch(getTask());
    this.tasks$ = this.store.select(selectSortedTasks);
    this.taskFilters$ = this.store.select(selectTaskFilters);
  }

  public onTaskClick(id: number): void {
    this.router.navigate([id]);
  }

  public trackById(index: number, item: Task): number {
    return item.id;
  }

  public onStatusChange(id: number, status: boolean): void {
    this.store.dispatch(editTaskStatus({ id, status }));
  }

  public onFilterChange(filter: TaskFilters): void {
    this.store.dispatch(filterChange({ filter }));
  }

}
