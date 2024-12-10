import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { httpOptionsHeaders } from '../../config/httpOptions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  form: FormGroup;
  validRegistration: boolean = true;
  processing: boolean = false;

  constructor(public router: Router, private httpClient: HttpClient) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      documentType: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      birthDate: new FormControl('', [Validators.required])
    });
  }

  register() {
    let nameField = this.form.get('name');
    let emailField = this.form.get('email');
    let passwordField = this.form.get('password');
    let phoneField = this.form.get('phone');
    let documentTypeField = this.form.get('documentType');
    let documentField = this.form.get('document');
    let genderField = this.form.get('gender');
    let birthDateField = this.form.get('birthDate');

    this.processing = true;
    this.httpClient.post<HttpResponse<any>>(`${environment.api}/authentication/register/user`, JSON.stringify({
      name: nameField!.value,
      email: emailField!.value,
      password: passwordField!.value,
      telephone: phoneField!.value,
      document: documentField!.value,
      gender: genderField!.value,
      birthDate: birthDateField!.value
    }), { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        this.processing = false;
        if (response.status !== 201) {
          this.validRegistration = false;
          return;
        }

        this.router.navigateByUrl('/login');
      })
  }
}
