import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseCardCarouselComponent } from './course-card-carousel/course-card-carousel.component';

@NgModule({
  declarations: [
    CourseCardComponent,
    CourseCardCarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CourseCardComponent,
    CourseCardCarouselComponent
  ]
})
export class ComponentsModule { }
