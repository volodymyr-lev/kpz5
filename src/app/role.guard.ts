import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRoles = this.authService.getUserRoles(); 

    const routeRoles = route.data['roles'] as Array<string>; 

    console.log('User Roles:', userRoles);
    console.log('Route Roles:', routeRoles);

    if (userRoles.some((role: string) => routeRoles.includes(role))) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
