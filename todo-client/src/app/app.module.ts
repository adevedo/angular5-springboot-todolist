import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatToolbarModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatCardModule
  , MatInputModule, MatSlideToggleModule, MatChipsModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {TodoFilterPipe} from './todo-filter-pipe';


@NgModule({
  declarations: [
    AppComponent, TodoFilterPipe
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatCheckboxModule,
    MatListModule, MatIconModule, MatCardModule, MatInputModule, MatSlideToggleModule, MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
