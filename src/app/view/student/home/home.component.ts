import { Component } from '@angular/core';
import { Course } from '../../../models/Course';
import { environment } from '../../../environment';
import { forkJoin } from 'rxjs';
import { httpOptions } from '../../../config/httpOptions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class StudentHomeComponent {
  onGoingCourses: any = []
  newCourses: any = []

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    const $newCourses = this.httpClient.get(`${environment.api}/Course/User?OrderBy=Date&OrderByDescending=true&amount=20`, httpOptions);
    const $onGoingCourses = this.httpClient.get(`${environment.api}/Course/User?OrderBy=Date&OrderByDescending=true&amount=20&Progress=InProgress`, httpOptions);

    forkJoin([$newCourses, $onGoingCourses]).subscribe(([newCourses, onGoingCourses]) => {
      this.newCourses = newCourses;
      this.onGoingCourses = onGoingCourses;
    });
  }
}
