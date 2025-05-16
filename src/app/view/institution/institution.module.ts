import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { CreateCourseModalComponent } from './home/create-course-modal/create-course-modal.component';
import { StepPageComponent } from './step-page/step-page.component';
import { StepComponent } from './step/step.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateCourseModalComponent,
    StepPageComponent,
    StepComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HomeComponent,
    CreateCourseModalComponent,
    StepPageComponent,
    StepComponent,
  ]
})
export class InstitutionModule {}
