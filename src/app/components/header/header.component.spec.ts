import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { TaskFormComponent } from '../../shared';
import { createTask } from '../../features/task/store';
import { PriorityENUM, Task } from '../../core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Store, useValue: storeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open add task dialog', () => {
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of({ title: 'Test Task' }) });
    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.openAddTaskDialog();

    expect(dialogSpy.open).toHaveBeenCalledWith(TaskFormComponent, { width: '400px' });
  });

  it('should dispatch createTask action when dialog is closed with a task', () => {
    const task: Task = { 
      id: 1, 
      title: 'Test Task', 
      priority: PriorityENUM.High, 
      completed: false, 
      createdAt: new Date() 
    };
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(task) });
    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.openAddTaskDialog();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(createTask({ task }));
  });

  it('should not dispatch createTask action when dialog is closed without a task', () => {
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(null) });
    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.openAddTaskDialog();

    expect(storeSpy.dispatch).not.toHaveBeenCalled();
  });
});
