import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { PriorityENUM, Task } from '../../../core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,

    MatSelectModule,
    MatButtonModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule

  ],
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA);

  priorityENUM = PriorityENUM;
  taskForm: FormGroup = new FormGroup({});

  private fb = inject(FormBuilder);
  private dialogRef: MatDialogRef<TaskFormComponent> = inject(MatDialogRef);

  ngOnInit(): void {
    console.log(this.data);
    this.initForm();
  }

  onSubmit(): void {
    const task = this.data ? { ...this.data, ...this.taskForm.value } : this.taskForm.value;
    this.dialogRef.close(task);
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      description: [this.data?.description || ''],
      dueDate: [this.data?.dueDate || new Date()],
      priority: [this.data?.priority || PriorityENUM.Low, Validators.required]
    });
  }

}
