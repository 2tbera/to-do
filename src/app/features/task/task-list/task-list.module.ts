import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskListComponent } from './task-list.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer, TaskEffects } from '../task';
import { ItemComponent } from '../../../shared';
import { TaskHttpService } from '../../../core';

@NgModule({
  declarations: [TaskListComponent],
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
