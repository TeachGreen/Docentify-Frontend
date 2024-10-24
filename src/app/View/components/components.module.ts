import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseCardCarouselComponent } from './course-card-carousel/course-card-carousel.component';

@NgModule({
  declarations: [
    HeroSectionComponent,
    CourseCardComponent,
    CourseCardCarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeroSectionComponent,
    CourseCardComponent,
    CourseCardCarouselComponent
  ]
})
export class ComponentsModule { }
