import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../../config/httpOptions';

@Component({
  selector: 'app-video-step',
  templateUrl: './video-step.component.html',
  styleUrls: ['./video-step.component.css', '../course.component.css']
})
export class VideoStepComponent {
  data: any = { content: '' };
  course: any = { name: '', description: '', steps: [] };
  @ViewChild('videoPlayer') videoPlayer: any;

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(`${environment.api}/Step/${this.activatedRoute.snapshot.params['id']}`, httpOptions)
    .subscribe((data: any) => {
      this.data = data;
      this.videoPlayer.nativeElement.src = 'https://www.youtube.com/embed/' + data.content;
    });
  }

  marcarConclusao() {
    this.httpClient.post(`${environment.api}/Step/Complete/${this.activatedRoute.snapshot.params['id']}`, {}, httpOptions)
    .subscribe((data: any) => {
      this.data.isCompleted = true;
    });
  }
}
