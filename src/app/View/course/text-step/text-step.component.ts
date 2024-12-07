import { Component } from '@angular/core';
import { environment } from '../../../environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-step',
  templateUrl: './text-step.component.html',
  styleUrl: './text-step.component.css'
})
export class TextStepComponent {
  data: any = { content: ''};
  course: any = { name: '', description: '', steps: [] };

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    fetch(`${environment.api}/Step/${this.activatedRoute.snapshot.params['id']}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        this.data = data;

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
