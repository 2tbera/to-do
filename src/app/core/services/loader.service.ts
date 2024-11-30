import { Injectable, signal } from '@angular/core';
 
/**
 * Service to manage the state of a loader.
 * 
 * This service provides methods to set and get the state of a loader,
 * which can be used to show or hide a loading indicator in the application.
 *
 */

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderState = signal(false);

  public setLoaderState(state: boolean): void {
    this.loaderState.set(state);
  }

  public getLoaderState(): boolean {
    return this.loaderState();
  }
}
