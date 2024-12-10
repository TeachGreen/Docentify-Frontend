import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from '../../environment';
import { httpOptionsHeaders } from '../../config/httpOptions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-password-change',
  templateUrl: './request-password-change.component.html',
  styleUrl: './request-password-change.component.css'
})
export class RequestPasswordChangeComponent {
  @ViewChild('emailInput') emailInput: any;
  processing = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  requestPasswordChange() {
    console.log(this.emailInput!.nativeElement.value)
    this.processing = true;
    this.httpClient.post<HttpResponse<any>>(`${environment.api}/authentication/PasswordChangeRequest/User`, JSON.stringify({
      email: this.emailInput!.nativeElement.value
    }), { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        this.processing = false;

        this.router.navigateByUrl('/confirmacao-identidade/' + response.body.id);
      })

  }
}
