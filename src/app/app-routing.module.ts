import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoursesComponent } from './view/courses/courses.component';
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
  { path: 'login', component: LoginComponent, title: 'Login - Docentify' },
  { path: 'registration', component: RegistrationComponent, title: 'Cadastro - Docentify' },
  {
    path: '', canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Página Inicial - Docentify' },
      { path: 'treinamentos', component: CoursesComponent, title: 'Treinamentos - Docentify' },
      { path: 'treinamento/:id', component: CourseComponent, children: [
        { path: '', component: CourseSummaryComponent },
        { path: 'leitura/:id', component: TextStepComponent, title: 'Leitura - Docentify' },
        { path: 'video/:id', component: VideoStepComponent, title: 'Vídeo - Docentify' },
        { path: 'descricao-atividade/:id', component: ActivityStepDescriptionComponent, title: 'Descrição da Atividade - Docentify' },
        { path: 'atividade/:id', component: ActivityStepComponent, title: 'Atividade - Docentify' },
      ] },
      { path: 'ranking', component: RankingComponent, title: 'Ranking - Docentify' },
      { path: 'perfil', component: ProfileComponent, title: 'Perfil - Docentify' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
