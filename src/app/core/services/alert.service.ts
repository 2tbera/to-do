import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertModel } from '../models';
import { AlertTypes } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  statusHandler = (data: AlertModel): void => {
    if (!data) {
      return;
    }
    switch (data.alertType) {
      case AlertTypes.Success:
        this.success(data.message, data.delay);
        break;
      case AlertTypes.Danger:
        this.danger(data.message, data.delay);
        break;
      case AlertTypes.Warning:
        this.warning(data.message, data.delay);
        break;
      case AlertTypes.Info:
        this.info(data.message, data.delay);
        break;
      default:
        console.warn(`Unknown alert type: ${data.alertType}`);
    }
  }

  private alert(message: string, type: string, delay: number = 5000): void {
    this.snackBar.open(message, undefined, {
      duration: delay,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type,
    });
  }

  private danger(message: string, delay?: number): void {
    this.alert(message, 'danger', delay);
  }

  private info(message: string, delay?: number): void {
    this.alert(message, 'info', delay);
  }

  private success(message: string, delay?: number): void {
    this.alert(message, 'success', delay);
  }

  private warning(message: string, delay?: number): void {
    this.alert(message, 'warning', delay);
  }
}
