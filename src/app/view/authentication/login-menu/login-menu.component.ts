import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { httpOptionsHeaders } from '../../../config/httpOptions';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrl: './login-menu.component.css'
})
export class LoginMenuComponent {
}
