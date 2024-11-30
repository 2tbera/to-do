import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, TaskState } from "../reducer/task.reducer";
import { FilterENUM, SortENUM, Task } from "../../../../core";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  adapter.getSelectors().selectAll
);

export const selectAllTaskEntities = createSelector(
  selectTaskState,
  adapter.getSelectors().selectEntities
);

export const selectTaskFilters = createSelector(
  selectTaskState,
  (data) => data.filter
);

export const selectTaskById = (taskId: string) => createSelector(
  selectAllTaskEntities,
  (entities): Task | undefined => {
    return entities[taskId];
  }
);

export const selectSortedTasks = createSelector(
  selectAllTasks,
  selectTaskFilters,
  (tasks, filterState) => {
    const FilterMap = {
      [FilterENUM.All]: (): boolean => true,
      [FilterENUM.Completed]: (item: Task): boolean => item.completed,
      [FilterENUM.Uncompleted]: (item: Task): boolean => !item.completed,
    };

    const SortMap = {
      [SortENUM.DueDate]: (a: Task, b: Task) => (b.dueDate && a.dueDate) ? a.dueDate.getTime() - b.dueDate.getTime() : 0,
      [SortENUM.CreationDate]: (a: Task, b: Task) => b.createdAt.getTime() - a.createdAt.getTime(),
      [SortENUM.Priority]: (a: Task, b: Task) => b.priority - a.priority
    };

    const searchFunction = (task: Task) => {
      const searchTerm = filterState.searchTerm?.toLowerCase() || '';
      return task.title?.toLowerCase().includes(searchTerm) || task.description?.toLowerCase().includes(searchTerm);
    }
    return tasks.filter(FilterMap[filterState.filter]).filter(searchFunction).sort(SortMap[filterState.sort]);
  }
);
