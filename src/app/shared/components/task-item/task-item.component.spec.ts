import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DebugElement } from '@angular/core';

describe('TaskItemComponent', () => {
    let component: TaskItemComponent;
    let fixture: ComponentFixture<TaskItemComponent>;
    let taskElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatCheckboxModule, TaskItemComponent],
            declarations: []
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;
        taskElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});