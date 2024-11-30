import { FilterENUM, PriorityENUM, SortENUM } from "../enums";


export class Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: PriorityENUM;
  completed: boolean;
  createdAt: Date;
  newDate?: Date;
  progress?: number;
  isExpired?: boolean;

  constructor(
    task: Task
  ) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.priority = task.priority;
    this.completed = task.completed;
    this.createdAt = new Date(task.createdAt);

    if (task.dueDate && task.newDate) {
      this.dueDate = new Date(task.dueDate);
      this.isExpired = new Date(task.newDate).getTime() > new Date(task.dueDate).getTime();
      this.progress = calculateProgress(new Date(task.dueDate).getTime(), new Date(task.createdAt).getTime(), new Date(task.newDate).getTime());
    }
  }
}

export class TaskFilters {
  filter: FilterENUM;
  sort: SortENUM;
  searchTerm: string;
  constructor(
    filter: string,
    sort: string,
    searchTerm: string
  ) {
    this.filter = filter ? parseInt(filter) : FilterENUM.All;
    this.sort = sort ? parseInt(sort) : SortENUM.DueDate;
    this.searchTerm = searchTerm || '';
  }
}


function calculateProgress(dueDate: number, createdAt: number, newDate: number): number {
  if (newDate >= dueDate) {
    return 100;
  }
  if (newDate <= createdAt) {
    return 0;
  }
  return ((newDate - createdAt) / (dueDate - createdAt)) * 100;
}