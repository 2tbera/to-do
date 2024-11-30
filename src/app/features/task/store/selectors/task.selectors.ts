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

/**
 * Selector to get the current task filters from the task state.
 * @returns {FilterState} - The current filter state which includes filter and sort criteria.
 */
export const selectTaskFilters = createSelector(
  selectTaskState,
  (data) => data.filter
);

/**
 * Selector to get a task by its ID.
 * @param {string} taskId - The ID of the task to select.
 * A selector that returns the task with the specified ID.
 */
export const selectTaskById = (taskId: string) => createSelector(
  selectAllTaskEntities,
  (entities): Task | undefined => {
    return entities[taskId];
  }
);

/**
 * Selector to get tasks filtered and sorted based on the current filter and sort state.
 * @param {Array<Task>} tasks - The list of all tasks.
 * @param {FilterState} filterState - The current filter and sort state.
 * @returns {Array<Task>} - The list of tasks filtered and sorted according to the filter and sort state.
 * Tasks are also filtered by a search term in the title or description.
 */
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
