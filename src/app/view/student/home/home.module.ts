import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomeComponent } from '../home/home.component';
import { ComponentsModule } from '../components/components.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    StudentHomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbCarouselModule
  ],
  exports: []
})
export class HomeModule { }
