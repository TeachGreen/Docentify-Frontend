import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institution-layout',
  templateUrl: './institution-layout.component.html',
  styleUrls: ['./institution-layout.component.css']
})
export class InstitutionLayoutComponent {
  sidebarOpen = false;

  constructor(public router: Router) {

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  deslogar() {
    localStorage.clear();
    this.router.navigateByUrl('/authentication');
  }
}
