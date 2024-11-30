import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormComponent } from './task-form.component';
import { PriorityENUM } from '../../../core';

describe('TaskFormComponent', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;
    let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TaskFormComponent>>;

    beforeEach(async () => {
        dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                TaskFormComponent
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: dialogRefSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
        expect(component.taskForm.value).toEqual({
            title: '',
            description: '',
            dueDate: jasmine.any(Date),
            priority: PriorityENUM.Low
        });
    });

    it('should initialize form with provided data', () => {
        const data = {
            title: 'Test Task',
            description: 'Test Description',
            dueDate: new Date('2023-01-01'),
            priority: PriorityENUM.High
        };
        component.data = data;
        component.ngOnInit();
        expect(component.taskForm.value).toEqual(data);
    });

    it('should close dialog with form data on submit', () => {
        component.taskForm.setValue({
            title: 'Test Task',
            description: 'Test Description',
            dueDate: new Date('2023-01-01'),
            priority: PriorityENUM.High
        });
        component.onSubmit();
        expect(dialogRefSpy.close).toHaveBeenCalledWith({
            title: 'Test Task',
            description: 'Test Description',
            dueDate: new Date('2023-01-01'),
            priority: PriorityENUM.High
        });
    });

    it('should close dialog with merged data on submit if data exists', () => {
        const data = {
            title: 'Existing Task',
            description: 'Existing Description',
            dueDate: new Date('2023-01-01'),
            priority: PriorityENUM.Medium
        };
        component.data = data;
        component.ngOnInit();
        component.taskForm.setValue({
            title: 'Updated Task',
            description: 'Updated Description',
            dueDate: new Date('2023-02-01'),
            priority: PriorityENUM.High
        });
        component.onSubmit();
        expect(dialogRefSpy.close).toHaveBeenCalledWith({
            title: 'Updated Task',
            description: 'Updated Description',
            dueDate: new Date('2023-02-01'),
            priority: PriorityENUM.High
        });
    });
});