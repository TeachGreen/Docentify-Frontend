import { Component } from '@angular/core';
import { Course } from '../../models/Course';
import { environment } from '../../environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  onGoingCourses: Course[] = []
  newCourses: Course[] = []

  ngOnInit() {
    fetch(`${environment.api}/Course/User?OrderBy=Date&OrderByDescending=true&amount=20`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        console.log(this.newCourses);
        this.newCourses = data;
      });

    fetch(`${environment.api}/Course/User?OrderBy=Date&OrderByDescending=true&amount=20&Progress=InProgress`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        this.onGoingCourses = data;
      });

    // fetch(`${environment.api}/Course/User?OrderBy=Date&OrderByDescending=true&amount=20&Progress=NotStarted`, {
    //   method: 'GET',
    //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    // }).then(response => response.json())
    //   .then((data) => {
    //     this.onGoingCourses.concat(data);
    //   });

  }
}
