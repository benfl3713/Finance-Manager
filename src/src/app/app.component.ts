import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  NavigationStart,
  ActivatedRoute,
  NavigationEnd,
  ActivatedRouteSnapshot,
  ActivationEnd,
} from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { TitleService } from './Services/title.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, switchMap } from 'rxjs/operators';

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
    private titleSerivce: TitleService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
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

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return null;
        })
      )
      .subscribe((ttl: string) => {
        this.titleSerivce.setTitle(ttl);
      });

    this.CheckForUpdate();
  }

  CheckForUpdate() {
    this.updates.available.subscribe(() => {
      this.snackBar
        .open('New Update Available', 'Refresh')
        .onAction()
        .subscribe(() =>
          this.updates.activateUpdate().then(() => document.location.reload())
        );
    });
  }
}
