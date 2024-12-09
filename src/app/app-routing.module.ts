import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoursesComponent } from './view/courses/courses.component';
import { PathsComponent } from './view/paths/paths.component';
import { LoginComponent } from './view/login/login.component';
import { AuthGuard } from './injectables/auth.guard';
import { RegistrationComponent } from './view/registration/registration.component';
import { ProfileComponent } from './view/profile/profile.component';
import { CourseComponent } from './view/course/course.component';
import { TextStepComponent } from './view/course/text-step/text-step.component';
import { RankingComponent } from './View/ranking/ranking.component';
import { CourseSummaryComponent } from './view/course/course-summary/course-summary.component';
import { VideoStepComponent } from './view/course/video-step/video-step.component';
import { ActivityStepDescriptionComponent } from './view/course/activity-step-description/activity-step-description.component';
import { ActivityStepComponent } from './view/course/activity-step/activity-step.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: '', canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'treinamentos', component: CoursesComponent },
      { path: 'treinamento/:id', component: CourseComponent, children: [
        { path: '', component: CourseSummaryComponent },
        { path: 'leitura/:id', component: TextStepComponent },
        { path: 'video/:id', component: VideoStepComponent },
        { path: 'descricao-atividade/:id', component: ActivityStepDescriptionComponent },
        { path: 'atividade/:id', component: ActivityStepComponent },
      ] },
      { path: 'treinamento/:courseId/leitura/:id', component: TextStepComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'perfil', component: ProfileComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
