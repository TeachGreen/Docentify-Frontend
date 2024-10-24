import { Component, Input } from '@angular/core';
import { Course } from '../../../Models/Course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!: Course;
}
