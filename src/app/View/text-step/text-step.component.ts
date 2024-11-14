import { Component } from '@angular/core';
import { environment } from '../../environment';
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
    fetch(`https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api/Step/${this.activatedRoute.snapshot.params['id']}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        this.data = data;

        fetch(`https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api/Course/${this.activatedRoute.snapshot.params['courseId']}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
        }).then(response => response.json())
          .then((data) => {
            this.course = data;
          });
      });
  }
}
