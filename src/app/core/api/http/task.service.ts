import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService, CREATE_TASK, DELETE_TASK, GET_TASK_BYID, GET_TASKS, Task, UPDATE_TASK, UPDATE_TASK_STATUS } from '../../';

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  private api: ApiService = inject(ApiService);

  public getTasks(): Observable<Task[]> {
    return this.api.get<{ task: Task[] }>(GET_TASKS).pipe(
      map((responce: { task: Task[] }) => responce.task.map((task) => new Task(task)))
    );
  }

  public getTaskById(id: number): Observable<Task> {
    return this.api.get<{ task: Task }>(`${GET_TASK_BYID}${id}`).pipe(
      map((task: Task) => new Task(task))
    );
  }

  public editTask(id: number, task: Task): Observable<Task> {

    console.log('task', task);
    return this.api.put<{ task: Task[] }>(`${UPDATE_TASK}${id}`, task).pipe(
      map((task: Task) => new Task(task))
    );
  }

  public editTaskStatus(id: number, status: boolean): Observable<Task> {
    return this.api.put<{ task: Task[] }>(`${UPDATE_TASK_STATUS}${id}`, { status }).pipe(
      map((task: Task) => new Task(task))
    );
  }

  public createTask(task: Task): Observable<Task> {
    return this.api.post<{ task: Task }>(`${CREATE_TASK}`, task).pipe(
      map((task: Task) => new Task(task))
    );
  }

  public deleteTask(id: number): Observable<Task> {
    return this.api.delete(`${DELETE_TASK}${id}`);
  }

}
