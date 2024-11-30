import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskDetailsComponent } from './task-details.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskItemComponent } from '../../../shared';

import { MatButtonModule } from '@angular/material/button';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TaskEffects, taskReducer } from '../store';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [
    CommonModule,

    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,

    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatCheckboxModule,
    FormsModule,

    MatDialogTitle,
    TaskItemComponent,

    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects]),

    RouterModule.forChild([
      {
        path: '',
        component: TaskDetailsComponent,
      }
    ])

  ],
})
export class TaskListModule { }
