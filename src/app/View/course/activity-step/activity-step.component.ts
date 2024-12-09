import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment';
import { ShareDataService } from '../../../share-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { httpOptions } from '../../../config/httpOptions';


@Component({
  selector: 'app-activity-step',
  templateUrl: './activity-step.component.html',
  styleUrl: './activity-step.component.css'
})
export class ActivityStepComponent {
  stepData: any = { content: '' };
  course: any = { name: '', description: '', steps: [] };
  activityData: any;
  attemptsData: any;
  answers: any = {};

  constructor(private activatedRoute: ActivatedRoute, private dataService: ShareDataService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.course = data.course;
    });

    const $stepData = this.httpClient.get(`${environment.api}/Step/${this.activatedRoute.snapshot.params['id']}`, httpOptions);
    const $activityData = this.httpClient.get(`${environment.api}/Activity/Step/${this.activatedRoute.snapshot.params['id']}`, httpOptions);

    forkJoin([$stepData, $activityData]).subscribe(([stepData, activityData]) => {
      this.stepData = stepData;
      this.activityData = activityData;

      const $attemptsData = this.httpClient.get(`${environment.api}/Activity/${this.activityData.id}/Attempt`, httpOptions)
      $attemptsData.subscribe((attemptsData) => {
        this.attemptsData = attemptsData;
      });
    });
  }

  checkRadio(question: number, option: number) {
    this.answers[question] = option;
  }

  enviarAvaliacao() {
    let body = [];
    for (let key in this.answers) {
      body.push({ questionId: key, optionId: this.answers[key] });
    }
    this.httpClient.post(`${environment.api}/Activity/${this.activityData.id}/Attempt`, JSON.stringify(body), httpOptions)
      .subscribe((data) => {
        this.router.navigateByUrl(`/treinamento/${this.course.id}/descricao-atividade/${this.stepData.id}`);
      });
  }
}
