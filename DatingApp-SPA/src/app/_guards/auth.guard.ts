import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private aletrify: AlertifyService) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<String>;
    if (roles) {
      const match = this.authService.roleMatch(roles);

      if (match) {
        return true;

      } else {
        this.router.navigate(['members']);
        this.aletrify.error(' You are not authorized to access this area');        
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }
    this.aletrify.error('You shall not pass!!');
    this.router.navigate(['/home']);
    return false;
  }
}
