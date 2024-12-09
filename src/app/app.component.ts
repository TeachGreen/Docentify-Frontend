import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DocentifyFrontend';
  hiddenMenuRoutes = ['/login', '/registration'];

  @ViewChild('searchBar') searchBar: any;

  constructor(public router: Router) {

  }

  search() {
    this.router.navigate(['/treinamentos'], { queryParams: { 'search': this.searchBar.nativeElement.value } });
  }

  deslogar() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
