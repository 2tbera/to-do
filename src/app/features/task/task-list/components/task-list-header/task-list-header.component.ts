import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseSubscribeClass, TaskFilters } from '../../../../../core';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TaskListHeaderComponent extends BaseSubscribeClass implements OnInit {

  filterForm: FormGroup = new FormGroup({});

  filterState = input<TaskFilters>();
  filterChange = output<TaskFilters>();

  private fb = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.initFilters();
    this.subscribeToFitlers();
    this.initRrevState();
  }

  private initFilters() {
    this.filterForm = this.fb.group({
      searchTerm: [this.filterState()!.searchTerm, [Validators.minLength(3)]],
      filter: [this.filterState()!.filter, Validators.required],
      sort: [this.filterState()!.sort, Validators.required],
    });
  }

  private initRrevState() {
    let { filter, sort, searchTerm } = this.route.snapshot.queryParams;
    if (!filter || !sort || !searchTerm) {
      return;
    }
    let filterState = new TaskFilters(filter, sort, searchTerm);
    this.filterForm.setValue(filterState);
  }

  private subscribeToFitlers() {
    this.filterForm
      .valueChanges.
      pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$))
      .subscribe((filters) => this.filterChange.emit(filters));
  }

}
