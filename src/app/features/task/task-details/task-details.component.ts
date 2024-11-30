import { ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef } from '@angular/core';
import { BaseSubscribeClass, PriorityENUM, Task } from '../../../core';
import { Store } from '@ngrx/store';
import { deleteTask, editTask, editTaskStatus, getTaskByid, selectTaskById, } from '../store';
import { filter, Observable, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../shared';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent extends BaseSubscribeClass implements OnInit {

  priorityENUM = PriorityENUM;

  private store = inject(Store);
  private route = inject(ActivatedRoute);

  readonly dialog = inject(MatDialog);

  task$: Observable<Task | undefined> = new Observable<Task>();

  ngOnInit() {
    let { id } = this.route.snapshot.params || {};
    this.fetchTask(id);
    this.task$ = this.store.select(selectTaskById(id));
  }

  private fetchTask(id: number): void {
    this.store.dispatch(getTaskByid({ id }));
  }

  public onStatusChange(id: number, status: boolean): void {
    this.store.dispatch(editTaskStatus({ id, status }));
  }


  public openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((newTast: Task) => {
      if (newTast) {
        this.store.dispatch(editTask({ id: task.id, task: newTast }));
      }
    });
  }

  public openDialog(templateRef: TemplateRef<any>): void {
    const dilogRef = this.dialog.open(templateRef, {
      width: '250px',
    });

    dilogRef.afterClosed()
      .pipe(takeUntil(this.destroy$), filter(result => !!result))
      .subscribe(id => this.store.dispatch(deleteTask({ id })));
  }

}
