import { Component } from '@angular/core';

@Component({
  selector: 'app-institution-layout',
  templateUrl: './institution-layout.component.html',
  styleUrls: ['./institution-layout.component.css']
})
export class InstitutionLayoutComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
