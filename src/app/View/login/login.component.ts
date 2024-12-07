import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  validLogin: boolean = true;
  processing: boolean = false;

  constructor(public router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    let emailField = this.form.get('email');
    let passwordField = this.form.get('password');

    this.processing = true;
    fetch(`${environment.api}/authentication/login/user`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailField!.value, password: passwordField!.value })
    })
      .then(response => {
        if (response.status !== 200)
        {
          this.validLogin = false;
        }

        return response.json()
      })
      .then((data) => {
        this.processing = false;
        if (!data.jwt) {
          return;
        }
        
        localStorage.setItem('jwt', data.jwt);

        this.router.navigateByUrl('/home');
      })
  }
}
