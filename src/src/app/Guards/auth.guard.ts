import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { FinanceApiRequest } from '../Services/finance-api.request.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(state);
    if (FinanceApiRequest.Token) {
      const token = jwt_decode(FinanceApiRequest.Token);
      const expirary = new Date(token.exp * 1000);
      if (expirary < new Date()) {
        return this.denyAccess(state.url);
      }

      return true;
    }
    return this.denyAccess(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  denyAccess(redirectUrl: string): boolean {
    if (redirectUrl === '/') {
      redirectUrl = null;
    }

    this.router.navigate(['login'], { queryParams: { redirect: redirectUrl } });
    return false;
  }
}
