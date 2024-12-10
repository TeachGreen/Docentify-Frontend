import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './view/home/home.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CoursesModule } from './view/courses/courses.module';
import { LoginComponent } from './view/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './injectables/jwt-interceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './injectables/auth.guard';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { RegistrationComponent } from './view/registration/registration.component';
import { ProfileComponent } from './view/profile/profile.component';
import { CourseComponent } from './view/course/course.component';
import { TextStepComponent } from './view/course/text-step/text-step.component';
import { RankingComponent } from './View/ranking/ranking.component';
import { CourseSummaryComponent } from './view/course/course-summary/course-summary.component';
import { ActivityStepDescriptionComponent } from './view/course/activity-step-description/activity-step-description.component';
import { VideoStepComponent } from './view/course/video-step/video-step.component';
import { ActivityStepComponent } from './view/course/activity-step/activity-step.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestPasswordChangeComponent } from './view/request-password-change/request-password-change.component';
import { PasswordChangeConfirmationComponent } from './view/password-change-confirmation/password-change-confirmation.component';
import { NewPasswordCreationComponent } from './view/new-password-creation/new-password-creation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    CourseComponent,
    TextStepComponent,
    RankingComponent,
    CourseSummaryComponent,
    ActivityStepDescriptionComponent,
    VideoStepComponent,
    ActivityStepComponent,
    RequestPasswordChangeComponent,
    PasswordChangeConfirmationComponent,
    NewPasswordCreationComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    NgbModule,
    RouterOutlet,
    ReactiveFormsModule,
    HomeModule,
    CoursesModule,
    HttpClientModule
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
