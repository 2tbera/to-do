import { Component, inject , OnInit} from '@angular/core';
import { TaskService } from '../../../core';
import { Store } from '@ngrx/store';
import { getTask } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  private store = inject(Store);
  
  ngOnInit() {
    this.store.dispatch(getTask());
  }

  // Injecting the TaskService to access the task state (signal)
  private taskService = inject(TaskService);

  // Subscribe to signals for tasks
  tasks$ = this.taskService.tasks; // This gives access to the signal containing the tasks

  // Methods to toggle completion of tasks and delete tasks
  toggleCompletion(taskId: number, completed: boolean) {
    this.taskService.updateTask(taskId, { completed });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  // Helper methods to get the task list from the signal (using the .() syntax)
  get tasks() {
    return this.tasks$();
  }
}
