import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Import Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';  // For mat-select
import { MatDatepickerModule } from '@angular/material/datepicker'; // For mat-datepicker
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';  // For date handling
import { ReactiveFormsModule } from '@angular/forms'; // For ReactiveForms
import { MatDialogModule } from '@angular/material/dialog'; // For MatDialog
import { CommonModule } from '@angular/common';
import { Task } from '../../../core';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});
  priorities = ['Low', 'Medium', 'High'];
  isEditMode: boolean = false;

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskFormComponent>);
  public data = inject(MAT_DIALOG_DATA) as Task | null;

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    // Initialize the form
    this.taskForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      description: [this.data?.description || ''],
      dueDate: [this.data?.dueDate || ''],
      priority: [this.data?.priority || 'Medium', Validators.required]  // Set the initial priority
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.value;
      const task: Task = {
        id: this.data?.id || 0, // Set ID for new tasks
        completed: this.data?.completed || false,
        createdAt: this.data?.createdAt || new Date(),
        ...formValues
      };
      this.dialogRef.close(task);  // Return the task data back to the parent component
    }
  }

  // Handle cancel action
  onCancel() {
    this.dialogRef.close();  // Close the dialog without making changes
  }
}
