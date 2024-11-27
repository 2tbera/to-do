export class Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  createdAt: Date;

  constructor(
    id: number,
    title: string,
    priority: 'Low' | 'Medium' | 'High',
    completed: boolean,
    createdAt: Date,
    description?: string,
    dueDate?: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}