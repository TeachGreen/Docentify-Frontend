import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './view/home/home.module';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './view/components/components.module';
import { CoursesModule } from './view/courses/courses.module';
import { PathsModule } from './view/paths/paths.module';
import { LoginComponent } from './view/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterOutlet,
    HomeModule,
    CoursesModule,
    PathsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
