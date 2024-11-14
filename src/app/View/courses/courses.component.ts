import { Component, ViewChild } from '@angular/core';
import { Course } from '../../models/Course';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = []
  @ViewChild('search') search: any;
  @ViewChild('obrigatoriedade') obrigatoriedade: any;
  @ViewChild('progresso') progresso: any;
  @ViewChild('favoritado') favoritado: any;

  params: any;

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;

      let url = `${environment.api}/Course/User?OrderBy=Date&OrderByDescending=true&amount=20`;
      if (this.params['search']) {
        url += `&name=${this.params['search']}`;
      }
      if (this.params['obrigatoriedade']) {
        url += `&isRequired=${this.params['obrigatoriedade']}`;
      }
      if (this.params['progresso']) {
        url += `&progress=${this.params['progresso']}`;
      }
      if (this.params['favoritado']) {
        url += `&onlyFavorites=${this.params['favoritado']}`;
      }

      fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
      }).then(response => response.json())
        .then((data) => {
          this.courses = data;
        });
      });
  }

  ngAfterViewInit() {
    if (this.params['search']) {
      this.search.nativeElement.value = this.params['search'];
    }
    if (this.params['obrigatoriedade']) {
      this.obrigatoriedade.nativeElement.value = this.params['obrigatoriedade'];
    }
    if (this.params['progresso']) {
      this.progresso.nativeElement.value = this.params['progresso'];
    }
    if (this.params['favoritado']) {
      this.favoritado.nativeElement.checked = this.params['favoritado'];
    }

  }

  filtrar() {
    let params: { [key: string]: any } = {}
    if (this.search.nativeElement.value) {
      params['search'] = this.search.nativeElement.value;
    }
    if (this.obrigatoriedade.nativeElement.value) {
      params['obrigatoriedade'] = this.obrigatoriedade.nativeElement.value;
    }
    if (this.progresso.nativeElement.value) {
      params['progresso'] = this.progresso.nativeElement.value;
    }
    if (this.favoritado.nativeElement.checked) {
      params['favoritado'] = this.favoritado.nativeElement.checked;
    }

    this.router.navigate(['/treinamentos'], { queryParams: params, relativeTo: this.route });
  }
}
