import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  NavigationStart,
} from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { TitleService } from './Services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'finance-manager';

  constructor(
    private router: Router,
    private updates: SwUpdate,
    private loadingService: IsLoadingService,
    private titleSerivce: TitleService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingService.add({ key: ['default', 'lazy-loading'] });
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loadingService.remove({ key: ['default', 'lazy-loading'] });
      }
      if (event instanceof NavigationStart) {
        this.loadingService.remove();
        this.titleSerivce.resetTitle();
        this.titleSerivce.showBackButton.next(true);
      }
    });

    this.CheckForUpdate();
  }

  CheckForUpdate() {
    this.updates.available.subscribe(() => {
      this.updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
