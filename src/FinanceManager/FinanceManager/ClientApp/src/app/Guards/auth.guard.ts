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
    if (FinanceApiRequest.Token) {
      const token = jwt_decode(FinanceApiRequest.Token);
      const expirary = new Date(token.exp * 1000);
      if (expirary < new Date()) {
        return this.denyAccess();
      }

      return true;
    }
    return this.denyAccess();
  }

  denyAccess(): boolean {
    this.router.navigate(['login']);
    return false;
  }
}
