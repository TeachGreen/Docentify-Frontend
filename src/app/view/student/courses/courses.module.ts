import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
