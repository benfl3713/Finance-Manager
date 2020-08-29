import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { FinanceApiRequest } from '../Services/finance-api.request.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (FinanceApiRequest.Token) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
