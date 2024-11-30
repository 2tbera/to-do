import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';
import { AlertModel, AlertTypesENUM } from '../';

describe('AlertService', () => {
  let service: AlertService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [AlertService],
    });
    service = TestBed.inject(AlertService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar open method with correct parameters for success', () => {
    const spy = spyOn(snackBar, 'open');
    service['success']('Success message', 3000);
    expect(spy).toHaveBeenCalledWith('Success message', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'success',
    });
  });

  it('should call MatSnackBar open method with correct parameters for danger', () => {
    const spy = spyOn(snackBar, 'open');
    service['danger']('Danger message', 3000);
    expect(spy).toHaveBeenCalledWith('Danger message', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'danger',
    });
  });

  it('should call MatSnackBar open method with correct parameters for warning', () => {
    const spy = spyOn(snackBar, 'open');
    service['warning']('Warning message', 3000);
    expect(spy).toHaveBeenCalledWith('Warning message', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'warning',
    });
  });

  it('should call MatSnackBar open method with correct parameters for info', () => {
    const spy = spyOn(snackBar, 'open');
    service['info']('Info message', 3000);
    expect(spy).toHaveBeenCalledWith('Info message', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'info',
    });
  });
});