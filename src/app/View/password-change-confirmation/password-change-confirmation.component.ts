import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { httpOptionsHeaders } from '../../config/httpOptions';
import { environment } from '../../environment';

@Component({
  selector: 'app-password-change-confirmation',
  templateUrl: './password-change-confirmation.component.html',
  styleUrl: './password-change-confirmation.component.css'
})
export class PasswordChangeConfirmationComponent {
  @ViewChild('codeInput') codeInput: any;
  processing: boolean = false;
  invalidCode: boolean = false;

  constructor (private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  confirmPasswordChange() {
    this.invalidCode = false;
    this.processing = true;
    console.log(this.codeInput!.nativeElement.value)
    this.httpClient.post<HttpResponse<any>>(`${environment.api}/authentication/confirmidentity/user`, JSON.stringify({
      id: this.activatedRoute.snapshot.params['id'],
      code: this.codeInput!.nativeElement.value
    }), { headers: httpOptionsHeaders, observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        this.processing = false;

        if (response.body.confirmed)
          this.router.navigateByUrl(`/nova-senha/${this.activatedRoute.snapshot.params['id']}/${this.codeInput!.nativeElement.value}` );
        else
          this.invalidCode = true;
      })
  }
}
