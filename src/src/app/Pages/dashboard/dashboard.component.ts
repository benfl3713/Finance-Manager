import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/Services/title.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: TitleService) {
    this.titleService.showBackButton.next(false);
  }

  ngOnInit(): void {}
}
