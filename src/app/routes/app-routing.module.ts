import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/task/task-list/task-list.module').then(m => m.TaskListModule)
  },
  {
    path: ':id',
    loadChildren: () => import('../features/task/task-details/task-details.module').then(m => m.TaskListModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
