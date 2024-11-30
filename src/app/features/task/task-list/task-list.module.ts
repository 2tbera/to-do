import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskItemComponent } from '../../../shared';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { TaskListHeaderComponent } from './components/task-list-header/task-list-header.component';
import { TaskEffects, taskReducer } from '../store';

@NgModule({
  declarations: [TaskListComponent, TaskListHeaderComponent],
  imports: [
    CommonModule,

    ScrollingModule,
    MatInputModule,
    MatButtonToggleModule,

    ReactiveFormsModule,

    TaskItemComponent,

    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects]),

    RouterModule.forChild([
      {
        path: '',
        component: TaskListComponent,
      }
    ])

  ],
})
export class TaskListModule { }
