import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class GuestGuard implements CanActivateChild {
  constructor(private router: Router, public jwtHelper: JwtHelperService) { }

  canActivateChild() {
    const token = localStorage.getItem('jwt');

    if (token === null || this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    if (this.router.url === '/') {
      const userType = localStorage.getItem('userType');
      if (userType === 'student')
        this.router.navigate(['/student/home']);
      else if (userType === 'institution')
        this.router.navigate(['/institution/home']);
    }
    return false;
  }
}