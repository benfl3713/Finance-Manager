import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ConfigService } from '../Services/config.service';

@Injectable({ providedIn: 'root' })
export class DemoGuard implements CanActivate {
  constructor(private configService: ConfigService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.configService.getValue('IsDemo').then((isDemo) => {
      if (isDemo === true) {
        console.error('Route is not allowed in demo mode');
        this.router.navigate(['/404']);
        return false;
      }

      return true;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  private readonly demoRouteExclusionList: string[] = [''];
}
