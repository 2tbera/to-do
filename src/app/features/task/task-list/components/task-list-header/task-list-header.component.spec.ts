import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskListHeaderComponent } from './task-list-header.component';
import { FilterENUM, SortENUM, TaskFilters } from '../../../../../core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskListHeaderComponent', () => {
    let component: TaskListHeaderComponent;
    let fixture: ComponentFixture<TaskListHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskListHeaderComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonToggleModule,
            
                NoopAnimationsModule,
                ReactiveFormsModule,
            
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParams: {
                                filter: FilterENUM.All,
                                sort: SortENUM.CreationDate,
                                searchTerm: 'test'
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskListHeaderComponent);
        component = fixture.componentInstance;
        // component.filterState = { filter: FilterENUM.All, sort: SortENUM.CreationDate, searchTerm: 'test' };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize filter form with default values', () => {
        expect(component.filterForm.value).toEqual({
            searchTerm: '',
            filter: FilterENUM.All,
            sort: SortENUM.CreationDate
        });
    });

    it('should update filter form values from query params', () => {
        component.ngOnInit();
        expect(component.filterForm.value).toEqual({
            searchTerm: '',
            filter: FilterENUM.All,
            sort: SortENUM.CreationDate
        });
    });

    it('should emit filterChange when form values change', () => {
        spyOn(component.filterChange, 'emit');
        component.filterForm.setValue({
            searchTerm: 'new search',
            filter: FilterENUM.Completed,
            sort: SortENUM.CreationDate
        });
        expect(component.filterChange.emit).toHaveBeenCalledWith({
            searchTerm: 'new search',
            filter: FilterENUM.Completed,
            sort: SortENUM.CreationDate
        });
    });

    it('should not update filter form if query params are missing', () => {
        (component as any).route.snapshot.queryParams = { searchTerm: '' };
        component.ngOnInit();
        expect(component.filterForm.value).toEqual({
            searchTerm: '',
            filter: FilterENUM.All,
            sort: SortENUM.CreationDate
        });
    });
});