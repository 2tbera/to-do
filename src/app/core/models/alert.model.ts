import {AlertTypes} from '../enums';

export class AlertModel {
  alertType: AlertTypes;
  delay: number;
  message: string;

  constructor(alertType: AlertTypes, delay: number, message: string) {
    this.alertType = alertType;
    this.delay = delay;
    this.message = message;
  }
}
