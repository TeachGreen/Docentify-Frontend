import { Component } from '@angular/core';
import { environment } from '../../../environment';
import { ActivatedRoute } from '@angular/router';
import { ShareDataService } from '../../../share-data.service';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../../config/httpOptions';

@Component({
  selector: 'app-activity-step-description',
  templateUrl: './activity-step-description.component.html',
  styleUrls: ['./activity-step-description.component.css', '../course.component.css']
})
export class ActivityStepDescriptionComponent {
  data: any = { content: '' };
  course: any = { name: '', description: '', steps: [] };

  constructor(private activatedRoute: ActivatedRoute, private dataService: ShareDataService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.course = data.course;
    });

    this.course.id = this.activatedRoute.snapshot.params['courseId'];

    this.httpClient.get(`${environment.api}/Step/${this.activatedRoute.snapshot.params['id']}`, httpOptions)
      .subscribe((data: any) => {
        this.data = data;
      });
  }
}
