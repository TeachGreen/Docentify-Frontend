import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { CreateCourseModalComponent } from './home/create-course-modal/create-course-modal.component';
import { StepPageComponent } from './step-page/step-page.component';
import { StepComponent } from './step/step.component';
import { InstitutionLayoutComponent } from './institution-layout/institution-layout.component';
import { RouterModule } from '@angular/router';
import { AssociateStudentComponent } from './associate-student/associate-student.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateCourseModalComponent,
    StepPageComponent,
    StepComponent,
    InstitutionLayoutComponent,
    AssociateStudentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    CreateCourseModalComponent,
    StepPageComponent,
    StepComponent,
  ]
})
export class InstitutionModule {}
