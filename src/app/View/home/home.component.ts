import { Component } from '@angular/core';
import { Course } from '../../Models/Course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
