import { Component, inject } from '@angular/core';
import { LoaderService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private loaderService: LoaderService = inject(LoaderService);

  public get loaderState(): boolean {
    return this.loaderService.getLoaderState();
  }
}
