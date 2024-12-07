import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-step',
  templateUrl: './video-step.component.html',
  styleUrl: './video-step.component.css'
})
export class VideoStepComponent {
  data: any = { content: ''};
  course: any = { name: '', description: '', steps: [] };
  videoUrl: string = '';

  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    fetch(`${environment.api}/Step/${this.activatedRoute.snapshot.params['id']}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        this.data = data;
        this.videoUrl = 'https://www.youtube.com/embed/' + data.content;
        console.log(this.activatedRoute.snapshot.params['courseId'])
        fetch(`${environment.api}/Course/${this.activatedRoute.snapshot.params['courseId']}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
        }).then(response => response.json())
          .then((data) => {
            this.course = data;
          });
      });
  }

  marcarConclusao() {
    fetch(`${environment.api}/Step/Complete/${this.activatedRoute.snapshot.params['id']}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        this.data.isCompleted = true;
      });
  }
}
