import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models';

@Injectable()
export class TaskService {
  // Signal for task list
  private taskList = signal<Task[]>([]);

  // Computed signals for filtering and sorting
  filteredTasks = computed(() => this.taskList());
  completedTasks = computed(() =>
    this.taskList().filter(task => task.completed)
  );
  uncompletedTasks = computed(() =>
    this.taskList().filter(task => !task.completed)
  );

  // Public getter for tasks
  get tasks() {
    return this.taskList;
  }

  // CRUD operations
  addTask(task: Task) {
    this.taskList.set([...this.taskList(), task]);  // Using set() to update signal value
  }

  updateTask(id: number, updatedTask: Partial<Task>) {
    const updatedTasks = this.taskList().map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    this.taskList.set(updatedTasks);  // Using set() to update signal value
  }

  deleteTask(id: number) {
    const filteredTasks = this.taskList().filter(task => task.id !== id);
    this.taskList.set(filteredTasks);  // Using set() to update signal value
  }
}
