import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environment';
import { CourseSummaryComponent } from './course-summary/course-summary.component';
import { ShareDataService } from '../../share-data.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  course: any = { name: '', description: '', steps: [], isEnrolled: false };
  steps: any;
  activityAmount: number = 0;
  readingAmount: number = 0;
  videoAmount: number = 0;
  processing: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private dataService: ShareDataService) { }

  ngOnInit() {
    fetch(`${environment.api}/Course/${this.activatedRoute.snapshot.params['id']}/with-steps`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        this.course = data;
        this.steps = this.course.steps;
        this.dataService.getData({ course: this.course, steps: this.steps });
        this.course.requiredDate = new Date(this.course.requiredDate).toLocaleDateString('pt-BR');
        for (let step of this.course.steps) {
          if (step.type === 1) {
            this.readingAmount++;
          } else if (step.type === 2) {
            this.videoAmount++;
          } else {
            this.activityAmount++;
          }
        }
      });
  }

  onOutletLoaded(component: CourseSummaryComponent) {
    component.course = this.course;
    component.steps = this.steps;
  }


  realizarMatricula() {
    this.processing = true
    fetch(`${environment.api}/Course/Enroll/${this.course.id}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
    }
    ).then(response => {
      if (response.status == 200) {
        this.course.isEnrolled = true;
      }
      this.processing = false;
    })
  }

  cancelarMatricula() {
    this.processing = true
    fetch(`${environment.api}/Course/Discontinue/${this.course.id}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
    }).then(response => {
      if (response.status == 200) {
        this.course.isEnrolled = false;
      }
      this.processing = false;
    })
  }
}
