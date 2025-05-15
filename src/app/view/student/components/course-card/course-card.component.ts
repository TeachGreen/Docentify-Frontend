import { Component, Input } from '@angular/core';
import { Course } from '../../../../models/Course';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../../../config/httpOptions';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!: Course;

  constructor(private httpClient: HttpClient) { }

  trimIfTooLong(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  favorite() {
    this.course.isFavorited = !this.course.isFavorited;

    this.httpClient.post(`${environment.api}/Course/Favorite/${this.course.id}`, httpOptions)
      .subscribe((data) => {
      });
  }
}
