import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatButtonModule } from '@angular/material/button';  // Optional: If you want buttons in the toolbar
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../shared';
import { Store } from '@ngrx/store';
import { createTask } from '../../features/task/store';


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private dialog = inject(MatDialog);
  private store = inject(Store);

  public openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(task => {
      if (task) {
        this.store.dispatch(createTask({ task }));
      }
    });
  }
}
