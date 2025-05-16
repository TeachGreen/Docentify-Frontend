import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './injectables/auth.guard';
import { LoginMenuComponent } from './view/authentication/login-menu/login-menu.component';
import { LoginStudentComponent } from './view/authentication/login-student/login-student.component';
import { LoginInstitutionComponent } from './view/authentication/login-institution/login-institution.component';
import { RegistrationStudentComponent } from './view/authentication/registration-student/registration-student.component';
import { AuthenticationComponent } from './view/authentication/authentication.component';
import { RequestPasswordChangeComponent } from './view/authentication/request-password-change/request-password-change.component';
import { NewPasswordCreationComponent } from './view/authentication/new-password-creation/new-password-creation.component';
import { PasswordChangeConfirmationComponent } from './view/authentication/password-change-confirmation/password-change-confirmation.component';
import { StudentGuard } from './injectables/student.guard';
import { InstitutionGuard } from './injectables/institution.guard';
import { StudentHomeComponent } from './view/student/home/home.component';
import { CoursesComponent } from './view/student/courses/courses.component';
import { CourseComponent } from './view/student/course/course.component';
import { CourseSummaryComponent } from './view/student/course/course-summary/course-summary.component';
import { TextStepComponent } from './view/student/course/text-step/text-step.component';
import { VideoStepComponent } from './view/student/course/video-step/video-step.component';
import { ActivityStepDescriptionComponent } from './view/student/course/activity-step-description/activity-step-description.component';
import { ActivityStepComponent } from './view/student/course/activity-step/activity-step.component';
import { RankingComponent } from './view/student/ranking/ranking.component';
import { ProfileComponent } from './view/student/profile/profile.component';
import { HomeComponent } from './view/institution/home/home.component';
import { GuestGuard } from './injectables/guest.guard';
import { StepComponent } from './view/institution/step/step.component';
import { StepPageComponent } from './view/institution/step-page/step-page.component';

const routes: Routes = [
  {
    path: '', canActivateChild: [GuestGuard], children: [
      { path: '', redirectTo: '/authentication/login/menu', pathMatch: 'full' },
      {
        path: 'authentication', component: AuthenticationComponent, children: [
          { path: '', redirectTo: 'login/menu', pathMatch: 'full' },
          { path: 'login/menu', component: LoginMenuComponent, title: 'Login - Docentify' },
          { path: 'login/student', component: LoginStudentComponent, title: 'Login - Aluno - Docentify' },
          { path: 'login/institution', component: LoginInstitutionComponent, title: 'Login - Instituição - Docentify' },
          { path: 'registration/student', component: RegistrationStudentComponent, title: 'Cadastro - Aluno - Docentify' },
          { path: 'password-recovery', component: RequestPasswordChangeComponent, title: 'Recuperação de Senha - Docentify' },
          { path: 'identity-confirmation/:id', component: PasswordChangeConfirmationComponent, title: 'Confirmação de Identidade - Docentify' },
          { path: 'new-password/:id/:codigo', component: NewPasswordCreationComponent, title: 'Criação de Nova Senha - Docentify' },
        ]
      }]
  },
  {
    path: '', canActivateChild: [AuthGuard], children: [
      {
        path: 'institution', canActivateChild: [InstitutionGuard], children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent, title: 'Página Inicial - Docentify' },
          { path: 'step', component: StepPageComponent, title: 'Trilha de criação - Docentify' }

         
        ]
      },
      {
        path: 'student', canActivateChild: [StudentGuard], children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: StudentHomeComponent, title: 'Página Inicial - Docentify' },
          { path: 'treinamentos', component: CoursesComponent, title: 'Treinamentos - Docentify' },
          {
            path: 'treinamento/:id', component: CourseComponent, children: [
              { path: '', component: CourseSummaryComponent },
              { path: 'leitura/:id', component: TextStepComponent, title: 'Leitura - Docentify' },
              { path: 'video/:id', component: VideoStepComponent, title: 'Vídeo - Docentify' },
              { path: 'descricao-atividade/:id', component: ActivityStepDescriptionComponent, title: 'Descrição da Atividade - Docentify' },
              { path: 'atividade/:id', component: ActivityStepComponent, title: 'Atividade - Docentify' },
            ]
          },
          { path: 'ranking', component: RankingComponent, title: 'Ranking - Docentify' },
          { path: 'perfil', component: ProfileComponent, title: 'Perfil - Docentify' },
        ]
      },
      

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
