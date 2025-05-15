import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesModule } from './courses/courses.module';
import { HomeModule } from './home/home.module';
import { ActivityStepComponent } from './course/activity-step/activity-step.component';
import { VideoStepComponent } from './course/video-step/video-step.component';
import { ActivityStepDescriptionComponent } from './course/activity-step-description/activity-step-description.component';
import { CourseSummaryComponent } from './course/course-summary/course-summary.component';
import { RankingComponent } from './ranking/ranking.component';
import { TextStepComponent } from './course/text-step/text-step.component';
import { CourseComponent } from './course/course.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
      ProfileComponent,
      CourseComponent,
      TextStepComponent,
      RankingComponent,
      CourseSummaryComponent,
      ActivityStepDescriptionComponent,
      VideoStepComponent,
      ActivityStepComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      HomeModule,
      CoursesModule
    ]
})
export class StudentModule { }
