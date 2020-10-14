import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
  selector: 'app-datafeeds',
  templateUrl: './datafeeds.component.html',
  styleUrls: ['./datafeeds.component.css'],
})
export class DatafeedsComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  isDemo$ = this.configService.getValue('IsDemo');

  ngOnInit(): void {}
}
