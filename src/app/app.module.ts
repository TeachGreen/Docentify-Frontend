import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './injectables/jwt-interceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './injectables/auth.guard';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './view/authentication/authentication.component';
import { LoginMenuComponent } from './view/authentication/login-menu/login-menu.component';
import { LoginStudentComponent } from './view/authentication/login-student/login-student.component';
import { LoginInstitutionComponent } from './view/authentication/login-institution/login-institution.component';
import { RegistrationStudentComponent } from './view/authentication/registration-student/registration-student.component';
import { NewPasswordCreationComponent } from './view/authentication/new-password-creation/new-password-creation.component';
import { PasswordChangeConfirmationComponent } from './view/authentication/password-change-confirmation/password-change-confirmation.component';
import { RequestPasswordChangeComponent } from './view/authentication/request-password-change/request-password-change.component';
import { StudentGuard } from './injectables/student.guard';
import { InstitutionGuard } from './injectables/institution.guard';
import { StudentModule } from './view/student/student.module';
import { InstitutionModule } from './view/institution/institution.module';


import { GuestGuard } from './injectables/guest.guard';




@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginInstitutionComponent,
    LoginStudentComponent,
    LoginMenuComponent,
    RegistrationStudentComponent,
    RequestPasswordChangeComponent,
    PasswordChangeConfirmationComponent,
    NewPasswordCreationComponent,
    AuthenticationComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    NgbModule,
    RouterOutlet,
    ReactiveFormsModule,
    StudentModule,
    InstitutionModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthGuard,
    GuestGuard,
    StudentGuard,
    InstitutionGuard,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
