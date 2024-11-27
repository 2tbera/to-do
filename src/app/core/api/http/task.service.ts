import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService, GET_TICKECTS, Task } from '../../';

@Injectable()
export class TaskHttpService {

  private api: ApiService = inject(ApiService);

  public getTasks(): Observable<Task[]> {
    return this.api.get<{ task: Task[] }>(GET_TICKECTS).pipe(
      map((responce) => responce.task)
    );
  }

}
