import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  form: FormGroup;
  validRegistration: boolean = true;

  constructor(public router: Router) {
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

    fetch(`${environment.api}/authentication/register/user`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameField!.value,
        email: emailField!.value,
        password: passwordField!.value,
        telephone: phoneField!.value,
        document: documentField!.value,
        gender: genderField!.value,
        birthDate: birthDateField!.value
      })
    })
      .then(response => {
        if (response.status !== 200) {
          this.validRegistration = false;
          return;
        }

        return response.json()
      })
      .then((data) => {
        this.router.navigateByUrl('/login');
      })
  }
}
