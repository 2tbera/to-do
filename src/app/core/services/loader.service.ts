import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderState = signal(false);

  setLoaderState(state: boolean): void {
    this.loaderState.set(state);
  }

  getLoaderState(): boolean {
    return this.loaderState();
  }
}
