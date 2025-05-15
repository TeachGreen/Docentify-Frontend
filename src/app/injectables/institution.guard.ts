import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class InstitutionGuard implements CanActivateChild {
  constructor(private router: Router, public jwtHelper: JwtHelperService) {}

  canActivateChild() {
    const type = localStorage.getItem('userType');

    if (type === 'institution') {
      return true;
    }

    return false;
  }
}