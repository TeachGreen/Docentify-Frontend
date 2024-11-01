import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathsComponent } from './paths.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    PathsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    PathsComponent
  ]
})
export class PathsModule { }
