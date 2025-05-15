import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { httpOptionsHeaders } from '../../../config/httpOptions';
import { environment } from '../../../environment';

@Component({
  selector: 'app-new-password-creation',
  templateUrl: './new-password-creation.component.html',
  styleUrl: './new-password-creation.component.css'
})
export class NewPasswordCreationComponent {
  @ViewChild('passwordInput') passwordInput: any;
  processing: boolean = false;

  constructor (private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  confirmPasswordChange() {
    this.processing = true;
    this.httpClient.post<HttpResponse<any>>(`${environment.api}/authentication/PasswordCreation/User`, JSON.stringify({
      code: this.activatedRoute.snapshot.params['codigo'],
      id: this.activatedRoute.snapshot.params['id'],
      password: this.passwordInput!.nativeElement.value
    }), { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        this.processing = false;

        this.router.navigateByUrl(`/authentication/login/student` );
      })
  }

}
