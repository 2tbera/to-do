import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TaskFormComponent } from '../../../shared';
import { getTaskByid, editTaskStatus, deleteTask, editTask } from '../store';
import { PriorityENUM, Task } from '../../../core';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let store: Store;
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailsComponent],
      imports: [
        StoreModule.forRoot({}),
        MatDialogModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } }
          }
        },
        {
          provide: OverlayContainer,
          useFactory: () => {
            const overlayContainer = document.createElement('div');
            document.body.appendChild(overlayContainer);
            return { getContainerElement: () => overlayContainer };
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.removeChild(overlayContainerElement);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch task on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(getTaskByid({ id: 1 }));
  });

  it('should dispatch editTaskStatus on status change', () => {
    const spy = spyOn(store, 'dispatch');
    component.onStatusChange(1, true);
    expect(spy).toHaveBeenCalledWith(editTaskStatus({ id: 1, status: true }));
  });

  it('should open edit task dialog and dispatch editTask on close', () => {
    const task: Task = { id: 1, title: 'Test Task', description: '',  priority: PriorityENUM.Low, completed: false, createdAt: new Date() };
    const spy = spyOn(store, 'dispatch');
    const dialogRefSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(task)
    } as any);

    component.openEditTaskDialog(task);
    expect(dialogRefSpy).toHaveBeenCalledWith(TaskFormComponent, {
      width: '400px',
      data: task
    });
    expect(spy).toHaveBeenCalledWith(editTask({ id: task.id, task }));
  });

  it('should open delete task dialog and dispatch deleteTask on close', () => {
    const spy = spyOn(store, 'dispatch');
    const templateRef = {} as any;
    const dialogRefSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(1)
    } as any);

    component.openDialog(templateRef);
    expect(dialogRefSpy).toHaveBeenCalledWith(templateRef, {
      width: '250px'
    });
    expect(spy).toHaveBeenCalledWith(deleteTask({ id: 1 }));
  });
});