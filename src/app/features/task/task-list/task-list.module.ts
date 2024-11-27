import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskListComponent } from './task-list.component';
import { ItemComponent } from '../../../shared';
import { TaskHttpService } from '../../../core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from '../task/reducer/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from '../task/effects/task.effects';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    ItemComponent,

    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: TaskListComponent,
      }
    ]),
  ],
  providers: [TaskHttpService]
})
export class TaskListModule { }
