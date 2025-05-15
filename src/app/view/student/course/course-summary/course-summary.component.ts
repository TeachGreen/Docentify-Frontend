import { Component } from '@angular/core';
import { ShareDataService } from '../../../../share-data.service';

@Component({
  selector: 'app-course-summary',
  host: {
    class: 'col-6 d-flex flex-column align-items-start',
  },
  templateUrl: './course-summary.component.html',
  styleUrls: ['./course-summary.component.css', '../course.component.css']
})
export class CourseSummaryComponent {
  course: any;
  steps: any;

  constructor(private dataService: ShareDataService) { }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.course = data.course;
      this.steps = data.steps;
    });
  }
}
