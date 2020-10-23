import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { FinanceApiRequest } from '../Services/finance-api.request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../Services/title.service';
import { MenuItems } from './MenuItems';
import { ConfigService } from '../Services/config.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isExpanded = false;
  IsMobile: boolean = false;
  LoadingBar = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private titleService: TitleService,
    private configService: ConfigService
  ) {}
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      map((isHandset) => (this.IsMobile = isHandset))
    );

  page_title$ = this.titleService.title;
  showBackButton$ = this.titleService.showBackButton;
  menuItems = MenuItems;
  siteName = '';

  ngOnInit(): void {
    this.configService
      .getValue('SiteName')
      .then((name) => (this.siteName = name || 'Finance Manager'));
  }

  PageChanged(): void {
    if (this.IsMobile === true) {
      this.sidenav.close();
    }
  }

  LogOut(): void {
    FinanceApiRequest.setToken(null);
    this.router.navigate(['login']);
  }

  goBack() {
    window.history.back();
  }
}
