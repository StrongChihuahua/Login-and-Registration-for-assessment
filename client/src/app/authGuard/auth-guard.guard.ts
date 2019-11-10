import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service'

@Injectable({
  providedIn: 'root'
})

export class AuthGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // check if user is currently login
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(!this.authService.isLoggedIn()) {
        this.router.navigateByUrl('login');
        this.authService.deleteToken();
        return false
      }
    return true;
  }
}
