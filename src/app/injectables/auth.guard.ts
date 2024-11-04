import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router, public jwtHelper: JwtHelperService) {}

  canActivateChild() {
    const token = localStorage.getItem('jwt');

    if (!this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(['/login']);
    console.log('teste')
    return false;
  }
}