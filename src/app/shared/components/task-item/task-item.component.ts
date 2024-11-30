import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PriorityENUM, Task } from '../../../core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-task-item',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './task-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  priorityENUM = PriorityENUM;

  data = input<Task>();
  taskClick = output<number>();
  statusChange = output<boolean>();

  public onStatusChange(checkboxed: boolean): void {
    this.statusChange.emit(checkboxed);
  }

  public onTaskClick(id: number): void {
    this.taskClick.emit(id);
  }

}
