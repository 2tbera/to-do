import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertModel , AlertTypesENUM } from '../';

/**
 * @class AlertService
 * @description Service to handle and display alert messages using MatSnackBar.
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  /**
   * Handles the alert status based on the provided AlertModel.
   * @param {AlertModel} data - The alert data containing message, type, and delay.
   */
  public statusHandler = (data: AlertModel): void => {
    if (!data) {
      return;
    }
    switch (data.alertType) {
      case AlertTypesENUM.Success:
        this.success(data.message, data.delay);
        break;
      case AlertTypesENUM.Danger:
        this.danger(data.message, data.delay);
        break;
      case AlertTypesENUM.Warning:
        this.warning(data.message, data.delay);
        break;
      case AlertTypesENUM.Info:
        this.info(data.message, data.delay);
        break;
      default:
        console.warn(`Unknown alert type: ${data.alertType}`);
    }
  }

  /**
   * Displays an alert message with the specified type and delay.
   * @param {string} message - The message to display.
   * @param {string} type - The type of alert (e.g., 'success', 'danger', 'info', 'warning').
   * @param {number} [delay=5000] - The duration to display the alert in milliseconds.
   * @private
   */
  private alert = (message: string, type: string, delay: number = 5000): void => {
    this.snackBar.open(message, undefined, {
      duration: delay,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type,
    });
  }

  /**
   * Displays a danger alert message.
   * @param {string} message - The message to display.
   * @param {number} [delay] - The duration to display the alert in milliseconds.
   * @private
   */
  private danger(message: string, delay?: number): void {
    this.alert(message, 'danger', delay);
  }

  /**
   * Displays an info alert message.
   * @param {string} message - The message to display.
   * @param {number} [delay] - The duration to display the alert in milliseconds.
   * @private
   */
  private info(message: string, delay?: number): void {
    this.alert(message, 'info', delay);
  }

  /**
   * Displays a success alert message.
   * @param {string} message - The message to display.
   * @param {number} [delay] - The duration to display the alert in milliseconds.
   * @private
   */
  private success(message: string, delay?: number): void {
    this.alert(message, 'success', delay);
  }

  /**
   * Displays a warning alert message.
   * @param {string} message - The message to display.
   * @param {number} [delay] - The duration to display the alert in milliseconds.
   * @private
   */
  private warning(message: string, delay?: number): void {
    this.alert(message, 'warning', delay);
  }
}
