import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Task } from '../../../core';

@Component({
  standalone: true,
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  data = input<Task>();

  @Input() item: Task = {} as Task;

}
