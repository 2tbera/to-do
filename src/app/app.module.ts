import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { AlertService, ApiService, LoaderService } from './core';
import { HeaderComponent } from './components';
import { HttpClientModule } from '@angular/common/http';
import {  StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    
    AppRoutingModule,
    HeaderComponent,

    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [
    ApiService,
    AlertService,
    LoaderService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
