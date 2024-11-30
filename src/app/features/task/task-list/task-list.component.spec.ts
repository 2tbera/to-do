import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskListComponent } from './task-list.component';
import { PriorityENUM, Task, TaskFilters } from '../../../core';
import { getTask, editTaskStatus, filterChange } from '../store';
import { TaskListHeaderComponent } from './components/task-list-header/task-list-header.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskItemComponent } from '../../../shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// 
describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;
    let store: MockStore;
    let router: Router;

    const initialState = {
        tasks: [],
        taskFilters: {}
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskListComponent, TaskListHeaderComponent],
            imports: [
                ScrollingModule,
                MatInputModule,
                MatButtonToggleModule,
            
                ReactiveFormsModule,
                TaskItemComponent,
                NoopAnimationsModule,
                TaskItemComponent,
            ],
            providers: [
                provideMockStore({ initialState }),
                { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
            ]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch getTask on init', () => {
        const dispatchSpy = spyOn(store, 'dispatch');
        component.ngOnInit();
        expect(dispatchSpy).toHaveBeenCalledWith(getTask());
    });


    it('should navigate to task detail on task click', () => {
        const taskId = 1;
        component.onTaskClick(taskId);
        expect(router.navigate).toHaveBeenCalledWith([taskId]);
    });

    it('should dispatch editTaskStatus on status change', () => {
        const dispatchSpy = spyOn(store, 'dispatch');
        const taskId = 1;
        const status = true;
        component.onStatusChange(taskId, status);
        expect(dispatchSpy).toHaveBeenCalledWith(editTaskStatus({ id: taskId, status }));
    });

    it('should dispatch filterChange on filter change', () => {
        const dispatchSpy = spyOn(store, 'dispatch');
        const filter: TaskFilters = new TaskFilters('0', '0', 'test');
        component.onFilterChange(filter);
        expect(dispatchSpy).toHaveBeenCalledWith(filterChange({ filter }));
    });

    it('should track by task id', () => {
        const task: Task = {
            id: 1,
            title: 'Test Task',
            completed: false,
            description: 'Test Description',
            dueDate: new Date(),
            priority: PriorityENUM.Low,
            createdAt: new Date(),
        };
        expect(component.trackById(0, task)).toBe(task.id);
    });
});