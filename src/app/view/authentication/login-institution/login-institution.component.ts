import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { httpOptionsHeaders } from '../../../config/httpOptions';

@Component({
  selector: 'app-login-institution',
  templateUrl: './login-institution.component.html',
  styleUrl: './login-institution.component.css'
})
export class LoginInstitutionComponent {
  form: FormGroup;
  validLogin: boolean = true;
  processing: boolean = false;

  constructor(public router: Router, private httpClient: HttpClient) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    let emailField = this.form.get('email');
    let passwordField = this.form.get('password');

    this.processing = true;
    this.httpClient.post<HttpResponse<any>>(`${environment.api}/authentication/login/institution`, JSON.stringify({ email: emailField!.value, password: passwordField!.value }), { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          let data = response.body;
          this.processing = false;
          if (!data.jwt) {
            return;
          }

          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', JSON.stringify(data.userId));
          localStorage.setItem('userType', 'institution');

          this.router.navigateByUrl('/institution/home');
        },
        error: (error: HttpErrorResponse) => {
          this.validLogin = false;
          this.processing = false;
        }
      })
  }
}
