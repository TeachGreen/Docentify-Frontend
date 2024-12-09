import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { httpOptionsHeaders } from '../../config/httpOptions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
    this.httpClient.post<HttpResponse<any>>(`${environment.api}/authentication/login/user`, JSON.stringify({ email: emailField!.value, password: passwordField!.value }), { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        if (response.status !== 200) {
          this.validLogin = false;
        }

        let data = response.body;
        this.processing = false;
        if (!data.jwt) {
          return;
        }

        localStorage.setItem('jwt', data.jwt);

        this.router.navigateByUrl('/home');
      })
  }
}
