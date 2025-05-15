import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseCardCarouselComponent } from './course-card-carousel/course-card-carousel.component';
import { PathCardComponent } from './path-card/path-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CourseCardComponent,
    CourseCardCarouselComponent,
    PathCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    CourseCardComponent,
    CourseCardCarouselComponent,
    PathCardComponent
  ]
})
export class ComponentsModule { }
