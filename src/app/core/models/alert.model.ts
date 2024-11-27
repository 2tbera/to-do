import { AlertTypesENUM } from "../";

;

export class AlertModel {
  alertType: AlertTypesENUM;
  delay: number;
  message: string;

  constructor(alertType: AlertTypesENUM, delay: number, message: string) {
    this.alertType = alertType;
    this.delay = delay;
    this.message = message;
  }
}
