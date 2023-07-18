import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppTrimDirective } from './shared/directives/app-trim.directive';
import { TaskListComponent } from './components/task-list/task-list.component';
import { DeleteTaskConfirmationDialogComponent } from './components/modal-popups/delete-task-confirmation-dialog/delete-task-confirmation-dialog.component';
import { AddUpdateTaskDialogComponent } from './components/modal-popups/add-update-task-dialog/add-update-task-dialog.component';
import { TaskContainerComponent } from './components/container/task-container/task-container.component';
import { ErrorContainerComponent } from './components/container/error-container/error-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/reducers';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskEffects } from './store/effects/task-effects.effects';
import { MatPackageModule } from './shared/modules/mat-package.module';
import { ChangeBgColorDirective } from './shared/directives/change-bgcolor.directive';
import { DateLocalePipe } from './shared/pipes/date-locale.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorContainerComponent,
    DeleteTaskConfirmationDialogComponent,
    TaskListComponent,
    TaskContainerComponent,
    AddUpdateTaskDialogComponent,
    AppTrimDirective,
    ChangeBgColorDirective,
    DateLocalePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPackageModule,
    StoreModule.forRoot(rootReducer, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
