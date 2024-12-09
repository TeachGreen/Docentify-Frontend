import { Component } from '@angular/core';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../config/httpOptions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = {};

  constructor(public router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(`${environment.api}/User`, httpOptions)
      .subscribe((data: any) => {
        this.user = data;
        this.user.birthDate = new Date(this.user.birthDate).toLocaleDateString('pt-BR');
      });
  }

  search() {
    
  }

  deslogar() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
