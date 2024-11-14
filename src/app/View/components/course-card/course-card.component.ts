import { Component, Input } from '@angular/core';
import { Course } from '../../../models/Course';
import { environment } from '../../../environment';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!: Course;

  
  trimIfTooLong(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  favorite() {
    this.course.isFavorited = !this.course.isFavorited;
    
    fetch(`${environment.api}/Course/Favorite/${this.course.id}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
      });

  }
}
