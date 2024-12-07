import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DocentifyFrontend';
  hiddenMenuRoutes = ['/login', '/registration'];

  constructor(public router: Router ) {

  }

  deslogar() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
