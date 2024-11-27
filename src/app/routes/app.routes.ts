import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../features/task/task-list/task-list.module').then(m => m.TaskListModule),
    },
];
