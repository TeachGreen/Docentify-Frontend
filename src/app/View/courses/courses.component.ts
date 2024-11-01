import { Component } from '@angular/core';
import { Course } from '../../Models/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },{
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
    {
      id: 1,
      title: 'Angular',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      isFavorited: true,
      isRequired: true,
      time: 15
    },
  ]
}
