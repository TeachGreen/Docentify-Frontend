import { Component } from '@angular/core';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = {};

  constructor(public router: Router) { }

  ngOnInit() {
    fetch(`${environment.api}/User`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then(response => response.json())
      .then((data) => {
        this.user = data;
        this.user.birthDate = new Date(this.user.birthDate).toLocaleDateString('pt-BR');
      });
  }

  deslogar() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
