import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../';
import { Task } from '../../models';

@Injectable()
export class TaskHttpService {

  private api: ApiService = inject(ApiService);

  public getTasks(): Observable<Task[]> {
    return this.api.get<{ task: Task[] }>('api/tasks').pipe(
      map((responce) => responce.task)
    );
  }

}
