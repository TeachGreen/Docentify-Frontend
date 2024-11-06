import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './view/home/home.module';
import { RouterOutlet } from '@angular/router';
import { CoursesModule } from './view/courses/courses.module';
import { PathsModule } from './view/paths/paths.module';
import { LoginComponent } from './view/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './injectables/jwt-interceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './injectables/auth.guard';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { RegistrationComponent } from './view/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterOutlet,
    ReactiveFormsModule,
    HomeModule,
    CoursesModule,
    PathsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthGuard,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
