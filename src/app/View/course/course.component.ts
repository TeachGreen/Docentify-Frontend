import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environment';
import { CourseSummaryComponent } from './course-summary/course-summary.component';
import { ShareDataService } from '../../share-data.service';
import { Location } from '@angular/common';
import { httpOptions, httpOptionsHeaders } from '../../config/httpOptions';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  course: any = { name: '', description: '', steps: [], isEnrolled: false };
  steps: any;
  hideSidebar: boolean = false;
  activityAmount: number = 0;
  readingAmount: number = 0;
  videoAmount: number = 0;
  processing: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private dataService: ShareDataService, public location: Location, private httpClient: HttpClient) { }

  ngOnInit() {
    this.hideSidebar = !this.location.path().includes('/atividade');

    this.httpClient.get(`${environment.api}/Course/${this.activatedRoute.snapshot.params['id']}/with-steps`, httpOptions)
      .subscribe((data) => {
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

  onOutletLoaded(component: any) {
    component.course = this.course;
    component.steps = this.steps;

    this.hideSidebar = !this.location.path().includes('/atividade')
  }

  realizarMatricula() {
    this.processing = true

    this.httpClient.post<HttpResponse<any>>(`${environment.api}/Course/Enroll/${this.course.id}`, {}, { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
        if (response.status == 200) {
          this.course.isEnrolled = true;
        }
        this.processing = false;
      });
  }

  cancelarMatricula() {
    this.processing = true

    this.httpClient.post<HttpResponse<any>>(`${environment.api}/Course/Discontinue/${this.course.id}`, {}, { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
        if (response.status == 200) {
          this.course.isEnrolled = false;
        }
        this.processing = false;
      });
  }

  voltar() {
    this.location.back();
  }
}
