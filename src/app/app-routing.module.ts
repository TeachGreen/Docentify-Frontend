import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoursesComponent } from './view/courses/courses.component';
import { PathsComponent } from './view/paths/paths.component';
import { LoginComponent } from './view/login/login.component';
import { AuthGuard } from './injectables/auth.guard';
import { RegistrationComponent } from './view/registration/registration.component';
import { ProfileComponent } from './view/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: '', canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'treinamentos', component: CoursesComponent },
      { path: 'trilhas', component: PathsComponent },
      { path: 'perfil', component: ProfileComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
