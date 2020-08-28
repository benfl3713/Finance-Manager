import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isExpanded = false;
  IsMobile: boolean = false;
  LoadingBar = false;

  constructor(private breakpointObserver: BreakpointObserver) {}
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      map((isHandset) => (this.IsMobile = isHandset))
    );

  ngOnInit(): void {}

  PageChanged() {
    if (this.IsMobile === true) {
      this.sidenav.close();
    }
  }
}
