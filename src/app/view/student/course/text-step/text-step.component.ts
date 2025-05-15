import { Component } from '@angular/core';
import { environment } from '../../../../environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../../../config/httpOptions';

@Component({
  selector: 'app-text-step',
  templateUrl: './text-step.component.html',
  styleUrls: ['./text-step.component.css', '../course.component.css']
})
export class TextStepComponent {
  data: any = { content: '' };

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(`${environment.api}/Step/${this.activatedRoute.snapshot.params['id']}`, httpOptions)
      .subscribe((data) => {
        this.data = data;
      });
  }

  marcarConclusao() {
    this.httpClient.post(`${environment.api}/Step/Complete/${this.activatedRoute.snapshot.params['id']}`, httpOptions)
      .subscribe((data) => {
        this.data.isCompleted = true;
      });
  }
}
