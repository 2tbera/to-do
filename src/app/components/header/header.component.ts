import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatButtonModule } from '@angular/material/button';  // Optional: If you want buttons in the toolbar
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core';
import { TaskFormComponent } from '../../features';


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule, // Add MatToolbarModule to imports
    MatButtonModule,
    MatIconModule,   // Add MatIconModule here
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // private taskService = inject(TaskService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // if (result) {
        // this.taskService.addTask(result);
        this.snackBar.open('Task added successfully', 'Close', { duration: 2000 });
      // }
    });
  }
}
